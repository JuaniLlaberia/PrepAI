import { model } from '@/gemini/index';

type GeminiExamTypes = {
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const generateExamWithGemini = async ({
  subject,
  difficulty,
}: GeminiExamTypes) => {
  const promptSchema = `
  {
    questions: [
      {question: 'string', options: 'string'[], correctAnswer: 'number'}
    ]
  }
  `;

  const prompt = `Generate an multiple choice exam about ${subject}
   with a ${difficulty} difficulty level. Provide ${
    difficulty === 'easy' || difficulty === 'medium' ? '10' : '15'
  } related questions
   (each with the question, 4 options and the correct option (being the option index)). Provide
   it in JSON format with this schema: ${promptSchema}.
   Remember to scape any special characters used in Javascript, such as "\n"
   `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[] = JSON.parse(jsonData).questions;

  return questions;
};

type GeminiInterviewTypes = {
  jobRole: string;
  jobDescription: string;
  jobExperience: 'intership' | 'junior' | 'ssr' | 'senior' | 'lead';
};

export const generateInterviewWithGemini = async ({
  jobRole,
  jobDescription,
  jobExperience,
}: GeminiInterviewTypes) => {
  const promptSchema = `
    {
      questions: [
        {
          question: 'string',
          hint: 'string'
        }
      ]
    }
  `;

  const prompt = `Generate job interview questions for the role of ${jobRole} with a
    ${jobExperience} level. The job description and content is: "${jobDescription}".
    For each question provide the question and a hint (short text to help the
    user understand the question) in this json schema format: ${promptSchema}. Based on
    the experience level generate between 4-6 questions.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const questions: { question: string; hint: string }[] =
    JSON.parse(jsonData).questions;

  return questions;
};

type GeminiFeedbackType = {
  userResponses: {
    question: string;
    questionId?: string;
    answer: string;
  }[];
};

export const generateInterviewFeedbackWithGemini = async ({
  userResponses,
}: GeminiFeedbackType) => {
  const prompt = `Generate feedback on how the user responded to the questions. This is the json ${JSON.stringify(
    userResponses
  )} containing the questions and the user answers. Provide a feedback and a score (1 to 10, 1 being very poorly and 10 being excellent) for each question/answer pair. The feedback must be between 3-5 lines. Return it in this json schema format: {feedbacks: [{userResponse: userResponse.answer, feedback, score, questionId: userResponse.questionId, question: userResponse.question}]}.

  In addition return a speech analysis based on the users responses (analyse the vocabulary, the words used and it's repetition and return a feedback between 4-6 (create it as if you were talking to the user) lines in the same json under the name of speechAnalysis.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const answers: {
    userResponse: string;
    feedback: string;
    score: number;
  }[] = JSON.parse(jsonData).feedbacks;

  const speechAnalysis = JSON.parse(jsonData).speechAnalysis as string;

  return { answers, speechAnalysis };
};
