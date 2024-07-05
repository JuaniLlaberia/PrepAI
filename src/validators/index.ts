import { Difficulty, Experience } from '@prisma/client';
import { z } from 'zod';

export const InterviewSchema = z.object({
  jobRole: z
    .string()
    .min(4, { message: 'Must be at least 4 characters.' })
    .max(40, { message: 'Must have less than 40 characters.' }),
  jobExperience: z.nativeEnum(Experience, {
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
  difficulty: z.nativeEnum(Difficulty, {
    message: 'Please select a difficulty.',
  }),
});
