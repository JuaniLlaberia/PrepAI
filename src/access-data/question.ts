import Question, { IQuestionDocument } from '@/db/models/Question';
import { getAuthUser } from '@/actions/auth';
import { generateQuestionAnswerWithGemini } from '@/gemini/functions';

export const getUserQuestions = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'all' | 'behavioral' | 'technical' | 'analytical';
}) => {
  const userId = await getAuthUser();

  const questionQuery = Question.find({ userId });

  if (filter !== 'all') questionQuery.where({ difficulty: filter });

  return await questionQuery
    .select('_id question difficulty pinned type createdAt')
    .sort(
      sort === 'createdAt'
        ? { pinned: 'desc', createdAt: 'desc' }
        : { pinned: 'desc', subject: 'desc' }
    )
    .lean();
};

export const getQuestionById = async ({
  questionId,
}: {
  questionId: string;
}) => {
  await getAuthUser();
  return await Question.findById(questionId)
    .select('question explanation answer difficulty type createdAt')
    .lean();
};

export const createQuestionWithAnswer = async ({
  question,
  userId,
}: {
  question: string;
  userId: string;
}) => {
  const questionData = await generateQuestionAnswerWithGemini({ question });
  const { answer, explanation, type, difficulty } = questionData;

  const { id } = await Question.create({
    question,
    answer,
    explanation,
    type,
    difficulty,
    userId,
  });

  return { id };
};

export const updateQuestion = async ({
  questionId,
  question,
}: {
  questionId: string;
  question: Partial<IQuestionDocument>;
}) => {
  await Question.findByIdAndUpdate(questionId, question);
};

export const deleteQuestion = async ({
  questionId,
}: {
  questionId: string;
}) => {
  await Question.findByIdAndDelete(questionId);
};
