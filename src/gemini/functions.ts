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
      {question: 'string', options: 'string'[], correctAnswer: 'number', explanation: 'string'}
    ]
  }
  `;

  const prompt = `Generate an multiple choice exam about ${subject}
   with a ${difficulty} difficulty level. Provide ${
    difficulty === 'easy' || difficulty === 'medium' ? '10' : '15'
  } related questions
   (each with the question, 4 options, the correct option (being the option index) and an explanation of the correct answer in 3-4 lines). Provide
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
    explanation: string;
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

type GeminiModulesTypes = {
  jobPosition: string;
  topics: string;
  jobExperience: 'intership' | 'junior' | 'ssr' | 'senior' | 'lead';
};

export const generateModulesWithGemini = async ({
  jobPosition,
  jobExperience,
  topics,
}: GeminiModulesTypes) => {
  const promptSchema = `
    {modules: [
      {
        title: 'string' (Module title),
        description: 'string' (What this module includes),
        subject: 'string' (Module topic),
        topics: [
          {
            label: 'string' (topic name),
            link: 'string' (reference/url to this topic in order for the user to learn/practice it, make sure that the urls actually exist. Provide at least 5 references for each)
          }
        ]
      }
    ]}
  `;

  const prompt = `Generate a list of modules (min 5, max 10) to get an user prepare for it's interviews for a ${jobExperience}
   level job position as a ${jobPosition} with the next topics: ${topics}. Each module should have this schema and data: ${promptSchema} returned in JSON format.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const modules: {
    title: string;
    description: string;
    subject: string;
    topics: { label: string; link: string }[];
  }[] = JSON.parse(jsonData).modules;

  return modules;
};
