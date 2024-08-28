import { IActivity } from '@/db/models/Activity';
import { model } from '@/gemini/index';

type GeminiExamTypes = {
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'multiple-choice' | 'true-false';
};

export const generateExamWithGemini = async ({
  subject,
  difficulty,
  type,
}: GeminiExamTypes) => {
  const promptSchema = `
  {
    questions: [
      {question: 'string', options: 'string'[], correctAnswer: 'number' (option index)}
    ]
  }
  `;

  const examType =
    type === 'multiple-choice' ? 'multiple choice' : 'true or false';

  const prompt = `Generate a ${examType} exam about ${subject}
   with a ${difficulty} difficulty level. Provide 10 questions. Provide
   it in JSON format with this schema: ${promptSchema}.
   In case it is a coding topic, do not include code snippets.
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

export const test = async ({
  data,
}: {
  data: {
    question: string;
    isCorrect: boolean;
    answerIndex: number;
  }[];
}) => {
  // Format the data for the prompt
  const formattedData = data
    .map((item, index) => {
      return `Question ${index + 1}: ${item.question}\nUser Answer: ${
        item.answerIndex
      }\nIs Correct: ${item.isCorrect}\n\n`;
    })
    .join('');

  // Construct the prompt for Gemini
  const prompt = `Generate explanations for each question and user answer provided below. 
      Format the explanations in a JSON object with the following schema:

      {
        answers: [
          {answer: data.answerIndex, isCorrect, explanation: 'string'}
        ]
      }

      User responses: 

      ${formattedData}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const answers: {
    answer: number;
    isCorrect: boolean;
    explanation?: string;
  }[] = JSON.parse(jsonData).answers;

  return answers;
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
  const prompt = `
    Generate in a JSON format, a list of modules (between 6 and 8) for a ${jobExperience} level ${jobPosition} preparing for interviews. The interview topics include ${topics}. Each module having the following schema:
      {modules: [
        {
            title: 'string' (Module title),
            description: 'string' (What this module includes),
            subject: 'string' (Module topic),
            order: 'number',
        }

      ]}. The difficulty levels should be ordered as follows: 'easy', 'medium', 'hard'. Sort the modules in ascending order of difficulty, add and order field to sort them properly.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  //Check parsin type
  const modules: {}[] = JSON.parse(jsonData).modules;

  return modules;
};

export const generateActivitiesWithGemini = async ({
  subject,
}: {
  subject: string;
}) => {
  const prompt = `
    Generate in a JSON format, a list of activities for a module with the ${subject} subject. Follow this schema:
    {
      activities: [
        {
          title: {subject} references,
          type: 'revision',
          description: 'string' (module description of 100 words),
          references: {
              label: 'string' (reference label),
              link: 'string' (link to reference related to this module)
            }[] (generate 5 references)
        },
        {
            title: {subject} introduction exam,
            type: 'exam',
            examType: 'multiple-choice',
            difficulty: 'string' (easy difficulty),
        },
        {
            title: True or False Challenge,
            type: 'exam',
            examType: 'true-false',
            difficulty: 'string' (medium difficulty),
        },
        {
            title: Practice {subject} exam,
            type: 'exam',
            examType: 'multiple-choice',
            difficulty: 'string' (medium difficulty),
        },
        {
            title: 'string' (activity title),
            type: 'project',
            content: 'string' (Project presentation and what needs to be done. Also provide some real world project ideas),
            steps: 'string'[] (Steps that the user should follow to complete this project),
            references: {
              label: 'string' (reference label),
              link: 'string' (link to reference that will help the user with the task)
            }[] (Between 2 and 5 references)
        },
        {
            title: 'string' (activity title),
            type: 'exam',
            examType: 'multiple-choice',
            difficulty: 'string' (hard difficulty),
        },
        {
            title: {subject} final interview,
            type: 'interview',
        }

      ]
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const activities: IActivity[] = JSON.parse(jsonData).activities;

  return activities;
};

export const generateQuestionAnswerWithGemini = async ({
  question,
}: {
  question: string;
}) => {
  const prompt = `Act as an interview candidate. You are given the following question in the interview: ${question}.
   Answer the question in an explanatory manner using plain text (no bullet points, no titles, no markup) in no less than 450 words.
   In addition based on the question difficulty label it as easy, medium or hard. And also include what type of question it is (behavioral, technical or analytical).
   Finally add an explanation to the question (what the interviewer may be looking with this question and how it should be approach). The output should be in JSON format
   following this schema: {answer: string, difficulty: string(lowercase), type: string (lowercase), explanation: string}.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  const generatedQuestion: {
    answer: string;
    difficulty: string;
    type: string;
    explanation: string;
  } = JSON.parse(jsonData);

  return generatedQuestion;
};
