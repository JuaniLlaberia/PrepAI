'use server';

import mongoose from 'mongoose';

import Module from '@/db/models/Modules';
import Exam from '@/db/models/Exam';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import { authAction } from './auth';
import {
  generateExamWithGemini,
  generateInterviewFeedbackWithGemini,
  generateInterviewWithGemini,
} from '@/gemini/functions';
import { IPathDocument } from '@/db/models/Path';

export const createExamForModule = async ({
  moduleId,
}: {
  moduleId: string;
}) => {
  await authAction();

  const moduleDB = await Module.findById(moduleId)
    .select('_id topics.label subject pathId')
    .populate<Pick<IPathDocument, 'jobExperience'>>('pathId', 'jobExperience');
  if (!moduleDB) throw new Error('Invalid module ID');

  //@ts-ignore
  const experience = moduleDB.pathId.jobExperience;
  const difficulty =
    experience === 'senior' || experience === 'lead' ? 'hard' : 'medium';

  const questions = await generateExamWithGemini({
    subject: moduleDB.subject,
    difficulty,
  });

  //We create a regular Exam with moduleId & pathId (for modules)
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

  return id;
};

export const finishExamAttemptForModule = async ({
  examId,
  attemptId,
  moduleId,
  data,
}: {
  examId: string;
  attemptId: string;
  moduleId: string;
  data: Partial<IExamAttemptDocument>;
}) => {
  const userId = await authAction();

  const score = data.answers?.filter(answer => answer.isCorrect).length!;
  const passed = score > data.answers?.length! - score;

  if (passed) {
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
      answers: data.answers,
      time: data.time,
      score,
      passed,
      examId,
      userId,
    });
  }

  return passed;
};

export const createInterviewForModule = async ({
  moduleId,
}: {
  moduleId: string;
}) => {
  await authAction();

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

  return id;
};

export const finishInterviewAttemptForModule = async ({
  userResponses,
  interviewId,
  attemptId,
  moduleId,
}: {
  userResponses: {
    question: string;
    questionId?: string;
    answer: string;
  }[];
  interviewId: string;
  attemptId: string;
  moduleId?: string;
}) => {
  await authAction();

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
