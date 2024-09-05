import mongoose from 'mongoose';

import Exam from '@/db/models/Exam';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import { getAuthUser } from '@/actions/auth';

export const createExamAttempt = async ({
  examId,
  userId,
}: {
  examId: string;
  userId: string;
}) => {
  //Check if we already have an attempt for this exam
  const examAttempt = await ExamAttempt.findOne({ examId, userId }).select(
    '_id'
  );

  //If we don't we create one
  if (!examAttempt) await ExamAttempt.create({ examId, userId });
};

export const getExamResults = async ({ examId }: { examId: string }) => {
  await getAuthUser();

  const questions = await Exam.findById(examId).select('questions').lean();
  const answers = await ExamAttempt.findOne({ examId })
    .select('score passed time answers')
    .lean();

  if (!questions || !answers) throw Error('Results not found');

  const quests = questions?.questions.map((question, i) => {
    return {
      correctAnswer: question.correctAnswer,
      question: question.question,
      options: question.options,
      explanation: answers?.answers[i]?.explanation,
      isCorrect: answers?.answers[i]?.isCorrect,
      answer: answers?.answers[i]?.answer,
    };
  });

  return {
    score: answers?.score,
    passed: answers?.passed,
    time: answers?.time,
    questions: quests,
  };
};

export const updateExamAttempt = async ({
  examId,
  examAttempt,
}: {
  examId: string;
  examAttempt: Partial<IExamAttemptDocument>;
}) => {
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    const { score, passed, time, answers } = examAttempt;

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
