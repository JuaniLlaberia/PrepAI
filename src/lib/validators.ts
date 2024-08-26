import { z } from 'zod';

export enum ExperienceEnum {
  INTERSHIP = 'intership',
  JUNIOR = 'junior',
  SRR = 'ssr',
  SENIOR = 'senior',
  LEAD = 'lead',
}

export enum DifficultyEnum {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum ExamTypeEnum {
  MULTIPLE = 'multiple-choice',
  TRUTH = 'true-false',
}

export const InterviewSchema = z.object({
  jobRole: z
    .string()
    .min(4, { message: 'Must be at least 4 characters.' })
    .max(40, { message: 'Must have less than 40 characters.' }),
  jobExperience: z.nativeEnum(ExperienceEnum, {
    message: 'Please select an experience level.',
  }),
  jobDescription: z
    .string()
    .min(20, { message: 'Must be at least 20 characters.' })
    .max(300, { message: 'Must have less than 300 characters.' }),
});

export const ExamSchema = z.object({
  subject: z
    .string()
    .min(4, 'Must be at least 4 characters.')
    .max(40, 'Must have less than 40 characters.'),
  difficulty: z.nativeEnum(DifficultyEnum, {
    message: 'Please select a difficulty.',
  }),
  type: z.nativeEnum(ExamTypeEnum, {
    message: 'Please select an exam type.',
  }),
});

export const PathSchema = z.object({
  jobPosition: z
    .string()
    .min(4, { message: 'Must be at least 4 characters.' })
    .max(40, { message: 'Must have less than 40 characters.' }),
  jobExperience: z.nativeEnum(ExperienceEnum, {
    message: 'Please select an experience level.',
  }),
  topics: z
    .string()
    .min(20, { message: 'Must be at least 20 characters.' })
    .max(300, { message: 'Must have less than 300 characters.' }),
});

export const FeedbackSchema = z.object({
  email: z.string().email(),
  feedback: z
    .string()
    .min(1, 'Must be at least 1 character')
    .max(300, { message: 'Must have less than 300 characters.' }),
});
