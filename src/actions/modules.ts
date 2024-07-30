'use server';

import mongoose from 'mongoose';
import { z } from 'zod';

import Module from '@/db/models/Modules';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import { authAction } from './auth';
import {
  generateInterviewFeedbackWithGemini,
  generateInterviewWithGemini,
} from '@/gemini/functions';
import { authenticatedAction } from '@/lib/safe-actions';
import { createExamForModule } from '@/access-data/modules';

export const createExamForModuleAction = authenticatedAction
  .createServerAction()
  .input(z.object({ moduleId: z.string() }))
  .handler(async ({ input: { moduleId } }) => {
    const { id } = await createExamForModule({ moduleId });

    return id;
  });

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
