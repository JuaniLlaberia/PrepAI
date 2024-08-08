import mongoose from 'mongoose';

import ExamAttempt from '@/db/models/ExamAttempt';
import Exam, { IExamDocument } from '@/db/models/Exam';
import { getAuthUser } from '@/actions/user';

export const getUserExams = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'all' | 'easy' | 'medium' | 'hard';
}) => {
  const userId = await getAuthUser();

  const examQuery = Exam.find({ userId });

  if (filter !== 'all') examQuery.where({ difficulty: filter });

  return await examQuery
    .select('_id subject difficulty taken pinned passed createdAt')
    .sort(
      sort === 'createdAt'
        ? { pinned: 'desc', createdAt: 'desc' }
        : { pinned: 'desc', subject: 'desc' }
    )
    .lean();
};

export const getExamQuestions = async ({ examId }: { examId: string }) => {
  await getAuthUser();

  const questions = await Exam.findById(examId).select('questions').lean();
  const plainQuestions = JSON.parse(JSON.stringify(questions)) as Pick<
    IExamDocument,
    'questions'
  >;

  return plainQuestions.questions;
};

export const createExam = async ({
  exam,
}: {
  exam: Partial<IExamDocument>;
}) => {
  const { id } = await Exam.create(exam);
  return { id };
};

export const deleteExam = async ({ examId }: { examId: string }) => {
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    await Promise.all([
      ExamAttempt.deleteMany({ examId }),
      Exam.findByIdAndDelete(examId),
    ]);
  } catch (err) {
    mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }
};

export const updateExam = async ({
  examId,
  exam,
}: {
  examId: string;
  exam: Partial<IExamDocument>;
}) => {
  await Exam.findByIdAndUpdate(examId, exam);
};
