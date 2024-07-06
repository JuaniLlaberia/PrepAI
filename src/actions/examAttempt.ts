'use server';

import ExamAttempt from '@/db/models/ExamAttempt';
import { authAction } from './auth';

export const createExamAttempt = async ({ examId }: { examId: string }) => {
  const userId = await authAction();

  const { _id } = await ExamAttempt.create({ examId, userId });
  return String(_id);
};
