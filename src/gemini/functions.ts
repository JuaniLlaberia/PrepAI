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
      {question: 'string', options: 'string'[], correctAnswer: 'number', explanation: 'string'}
    ]
  }
  `;

  const examType =
    type === 'multiple-choice' ? 'multiple choice' : 'true or false';

  const examDescription =
    type === 'multiple-choice'
      ? 'each with the question, 4 options, the correct option (being the option index) and an explanation of the correct answer in 3-4 lines'
      : 'each with the question, 2 options (true or false), the correct option (being the option index) and an explanation of the correct answer in 3-4 lines';

  const prompt = `Generate a ${examType} exam about ${subject}
   with a ${difficulty} difficulty level. Provide ${
    difficulty === 'easy' || difficulty === 'medium' ? '10' : '15'
  } related questions (${examDescription}). Provide
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
  const prompt = `
    Generate a JSON format of a list of modules (at least 7 and no more than 10 modules) for a ${jobExperience} level ${jobPosition} preparing for interviews. The interview topics include ${topics}. The modules should be ordered by difficulty (first the easier topics and then the harder ones), with each module having the following schema:
      {modules: [
        {
            title: 'string' (Module title),
            description: 'string' (What this module includes),
            subject: 'string' (Module topic),
            slug: 'string' (short unique slug for each module),
            order: 'number',
            activities: [
                {
                  title: {subject} references,
                  type: 'revision',
                  completed: false,
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
                    examId: undefined,
                    taken: 'boolean' (false),
                    passed: 'boolean' (false),
                    completed: false
                },
                {
                    title: True or False Challenge,
                    type: 'exam',
                    examType: 'true-false',
                    difficulty: 'string' (medium difficulty),
                    examId: undefined,
                    taken: 'boolean' (false),
                    passed: 'boolean' (false),
                    completed: false
                },
                {
                    title: Practice {subject} exam,
                    type: 'exam',
                    examType: 'multiple-choice',
                    difficulty: 'string' (medium difficulty),
                    examId: undefined,
                    taken: 'boolean' (false),
                    passed: 'boolean' (false),
                    completed: false
                },
                {
                    title: 'string' (activity title),
                    type: 'project',
                    completed: 'boolean' (false),
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
                    examId: undefined,
                    taken: 'boolean' (false),
                    passed: 'boolean' (false),
                    completed: false
                },
                {
                    title: {subject} final interview,
                    type: 'interview',
                    interviewId: undefined,
                    taken: 'boolean' (false),
                    passed: 'boolean' (false),
                    completed: false
                }
            ] (Generate the 7 activities for each module, as specified in the schema)
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
