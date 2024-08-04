import mongoose from 'mongoose';

import Exam from '@/db/models/Exam';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import Module, { IModuleDocument } from '@/db/models/Modules';
import {
  generateExamWithGemini,
  generateInterviewFeedbackWithGemini,
  generateInterviewWithGemini,
} from '@/gemini/functions';
import { getAuthUser } from '@/actions/user';
import { DifficultyEnum } from '@/lib/validators';

export const getModules = async ({
  pathId,
}: {
  pathId: string;
}): Promise<IModuleDocument[]> => {
  await getAuthUser();

  return await Module.aggregate([
    { $match: { pathId: new mongoose.Types.ObjectId(pathId) } },
    {
      $addFields: {
        completedActivities: {
          $size: {
            $filter: {
              input: '$activities',
              as: 'activity',
              cond: { $eq: ['$$activity.completed', true] },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        inProgress: 1,
        completed: 1,
        completedActivities: 1,
        slug: 1,
      },
    },
  ]);
};

export const getModuleBySlug = async ({
  slug,
  pathId,
}: {
  slug: string;
  pathId: string;
}) => {
  await getAuthUser();

  const moduleData = await Module.findOne({ pathId, slug }).lean();
  return JSON.parse(JSON.stringify(moduleData)) as IModuleDocument;
};

export const updateModule = async ({
  moduleId,
  module,
}: {
  moduleId: string;
  module: Partial<IModuleDocument>;
}) => {
  await Module.findByIdAndUpdate(moduleId, module);
};

export const updateActivity = async ({
  moduleId,
  activityId,
}: {
  moduleId: string;
  activityId: string;
}) => {
  await Module.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(moduleId),
      'activities.type': 'exam',
    },
    {
      $set: { 'activities.$[e1].examId': '66ad261f5a9e42c9412e8e01' },
    },
    {
      arrayFilters: [
        {
          'e1._id': activityId,
        },
      ],
    }
  );
};

export const createExamForModule = async ({
  moduleId,
  activityId,
  difficulty,
}: {
  moduleId: string;
  activityId: string;
  difficulty: DifficultyEnum;
}) => {
  const moduleDB = await Module.findById(moduleId).select('_id subject pathId');
  if (!moduleDB) throw new Error('Invalid module ID');

  const { subject, pathId } = moduleDB;

  const questions = await generateExamWithGemini({
    subject: subject,
    difficulty,
  });

  const { id } = await Exam.create({
    subject,
    difficulty,
    questions,
    pathId,
    moduleId,
    activityId,
  });

  await Module.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(moduleId),
      'activities.type': 'exam',
    },
    {
      $set: { 'activities.$[e1].examId': id },
    },
    {
      arrayFilters: [
        {
          'e1._id': activityId,
        },
      ],
    }
  );

  return { id };
};

export const updateExamAttemptFromModule = async ({
  examId,
  examAttempt,
  moduleId,
}: {
  examId: string;
  examAttempt: Partial<IExamAttemptDocument>;
  moduleId: string;
}) => {
  const { passed, score, time, answers } = examAttempt;

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    if (passed) {
      const exam = await Exam.findById(examId).select('_id activityId');

      await Module.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(moduleId),
          'activities.type': 'exam',
        },
        {
          $set: {
            'activities.$[e1].passed': true,
            'activities.$[e1].completed': true,
          },
        },
        {
          arrayFilters: [
            {
              'e1._id': exam?.activityId,
            },
          ],
        }
      );
    }

    await Promise.all([
      ExamAttempt.updateOne(
        { examId },
        {
          $max: { score },
          passed,
          time,
          answers,
        }
      ),
      Exam.findByIdAndUpdate(examId, { taken: true, passed }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
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

  const questions = await generateInterviewWithGemini({
    jobRole: moduleDB.subject,
    jobDescription: moduleDB.title,
    jobExperience: experience,
  });

  const { id } = await Interview.create({
    jobRole: moduleDB.subject,
    jobDescription: moduleDB.title,
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
