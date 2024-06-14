'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Interview } from '@prisma/client';

import { db } from '@/db';
import { model } from '@/gemini/index';

export const createInterview = async ({
  data,
}: {
  data: Partial<Interview>;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('You need to log in');

  const { jobRole, jobExperience, jobDescription } = data;
  if (!jobRole || !jobExperience || !jobDescription)
    throw new Error('Missing required data');

  //Create interview
  const { id } = await db.interview.create({
    data: {
      jobRole,
      jobExperience,
      jobDescription,
      taken: false,
      userId: user.id,
    },
  });

  //Create questions using gemini model
  const prompt = `Generate job interview questions for the role of ${jobRole} with a 
    ${jobExperience} level. The job description and content is: "${jobDescription}". 
    For each question provide the question and a hint (short text to help the 
    user understand the question) in this json schema format: {questions: [{question, hint}]}. Based on 
    the experience level generate between 4-6 questions.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const questions: { question: string; hint: string }[] =
    JSON.parse(jsonData).questions;

  const questionsWithId = questions.map(question => {
    return { ...question, interviewId: id };
  });

  //Store questions in db
  await db.question.createMany({ data: questionsWithId });

  return id;
};
