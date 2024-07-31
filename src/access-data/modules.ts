import mongoose from 'mongoose';

import Exam from '@/db/models/Exam';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import Module from '@/db/models/Modules';
import { IPathDocument } from '@/db/models/Path';
import {
  generateExamWithGemini,
  generateInterviewFeedbackWithGemini,
  generateInterviewWithGemini,
} from '@/gemini/functions';
import { getAuthUser } from '@/actions/user';

export const getModules = async ({ pathId }: { pathId: string }) => {
  await getAuthUser();

  return await Module.aggregate([
    { $match: { pathId: new mongoose.Types.ObjectId(pathId) } },
    {
      $addFields: {
        passedValue: {
          $cond: [
            {
              $and: [
                { $eq: ['$exam.passed', true] },
                { $eq: ['$interview.passed', true] },
              ],
            },
            2,
            {
              $cond: [
                {
                  $or: [
                    { $eq: ['$exam.passed', true] },
                    { $eq: ['$interview.passed', true] },
                  ],
                },
                1,
                0,
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        passedValue: 1,
      },
    },
  ]);
};

export const getModuleById = async ({ moduleId }: { moduleId: string }) => {
  await getAuthUser();

  return await Module.findById(moduleId);
};

export const createExamForModule = async ({
  moduleId,
}: {
  moduleId: string;
}) => {
  //Find module's path data
  const moduleDB = await Module.findById(moduleId)
    .select('_id topics.label subject pathId')
    .populate<Pick<IPathDocument, 'jobExperience'>>('pathId', 'jobExperience');
  if (!moduleDB) throw new Error('Invalid module ID');

  //@ts-ignore
  const experience = moduleDB.pathId.jobExperience;
  const difficulty =
    experience === 'senior' || experience === 'lead' ? 'hard' : 'medium';

  //Generate exam questions & create exam
  const questions = await generateExamWithGemini({
    subject: moduleDB.subject,
    difficulty,
  });

  const { id } = await Exam.create({
    subject: moduleDB.subject,
    difficulty,
    questions,
    moduleId,
    pathId: moduleDB.pathId,
  });

  //Store the exam id in the module object
  await Module.findByIdAndUpdate(moduleId, {
    exam: { passed: false, examId: id },
  });

  return { id };
};

export const updateExamAttemptFromModule = async ({
  examId,
  attemptId,
  examAttempt,
  moduleId,
}: {
  examId: string;
  attemptId: string;
  examAttempt: Partial<IExamAttemptDocument>;
  moduleId: string;
}) => {
  if (examAttempt.passed) {
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      await Promise.all([
        Module.findByIdAndUpdate(moduleId, {
          exam: { passed: true },
        }),
        Exam.findByIdAndDelete(examId),
        ExamAttempt.deleteMany({ examId }),
      ]);
    } catch (err) {
      await mongoSession.abortTransaction();
    } finally {
      mongoSession.endSession();
    }
  } else {
    await ExamAttempt.findByIdAndUpdate(attemptId, {
      ...examAttempt,
      examId,
    });
  }
};

export const createInterviewForModule = async ({
  moduleId,
}: {
  moduleId: string;
}) => {
  const moduleDB = await Module.findById(moduleId)
    .select('_id topics.label subject')
    .populate('pathId', 'jobExperience');
  if (!moduleDB) throw new Error('Invalid module ID');

  //@ts-ignore
  const experience = moduleDB.pathId.jobExperience as
    | 'intership'
    | 'junior'
    | 'ssr'
    | 'senior'
    | 'lead';

  const topics = moduleDB.topics.map(topic => topic.label).join(' ');

  const questions = await generateInterviewWithGemini({
    jobRole: moduleDB.subject,
    jobDescription: topics,
    jobExperience: experience,
  });

  const { id } = await Interview.create({
    jobRole: moduleDB.subject,
    jobDescription: topics,
    jobExperience: experience,
    questions,
    moduleId,
    pathId: moduleDB.pathId,
  });

  await Module.findByIdAndUpdate(moduleId, {
    interview: { passed: false, interviewId: id },
  });

  return { id };
};

export const createInterviewAttemptFeedbackForModule = async ({
  userResponses,
  interviewId,
  attemptId,
  moduleId,
}: {
  userResponses: {
    question: string;
    answer: string;
  }[];
  interviewId?: string;
  attemptId?: string;
  moduleId: string;
}) => {
  const { answers, speechAnalysis } = await generateInterviewFeedbackWithGemini(
    { userResponses }
  );

  const totalScore =
    answers.reduce((prev, crr) => prev + crr.score, 0) / answers.length;
  const passed = totalScore >= 6;

  if (passed) {
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      await Promise.all([
        Module.findByIdAndUpdate(moduleId, {
          interview: { passed: true },
        }),
        Interview.findByIdAndDelete(interviewId),
        InterviewAttempt.findByIdAndDelete(attemptId),
      ]);
    } catch (err) {
      await mongoSession.abortTransaction();
    } finally {
      mongoSession.endSession();
    }
  } else {
    await InterviewAttempt.findByIdAndUpdate(attemptId, {
      answers,
      speechAnalysis,
    });
  }
};
