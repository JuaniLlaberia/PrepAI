'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import Module from '@/db/models/Modules';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import Exam from '@/db/models/Exam';
import ExamAttempt from '@/db/models/ExamAttempt';
import Path, { IPathDocument } from '@/db/models/Path';
import { authAction } from './auth';
import { model } from '@/gemini';

export const getUserPaths = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'progress' | 'completed';
}) => {
  const userId = await authAction();

  return await Path.find({
    userId,
    completed: filter === 'completed' ? true : false,
  })
    .select('_id jobPosition jobExperience completed pinned createdAt')
    .sort(
      sort === 'createdAt'
        ? { pinned: 'desc', createdAt: 'desc' }
        : { pinned: 'desc', jobRole: 'desc' }
    );
};

export const getPathById = async ({ pathId }: { pathId: string }) => {
  const userId = await authAction();

  const passedModules = await Module.aggregate([
    {
      $match: {
        'exam.passed': true,
        'interview.passed': true,
      },
    },
    {
      $group: {
        _id: '$pathId',
        passedModules: { $sum: 1 },
      },
    },
  ]);

  const path = await Path.findById(pathId);
  if (String(path?.userId) !== userId)
    throw new Error('This path does not belong to you');

  return [path, passedModules[0]?.passedModules ?? 0];
};

export const createPath = async ({
  data,
}: {
  data: Partial<IPathDocument>;
}) => {
  const userId = await authAction();

  const { jobPosition, jobExperience, topics } = data;
  if (!jobPosition || !jobExperience || !topics)
    throw new Error('Missing required data');

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

  const { id } = await Path.create({
    jobPosition,
    jobExperience,
    topics,
    userId,
    modules: modules.length,
  });

  const modulesWithId = modules.map(module => {
    return { ...module, pathId: id };
  });

  await Module.create([...modulesWithId]);

  revalidatePath('/dashboard/paths');
  return id;
};

export const getModules = async ({ pathId }: { pathId: string }) => {
  await authAction();

  return await Module.aggregate([
    { $match: { pathId: new mongoose.Types.ObjectId(pathId) } },
    {
      $addFields: {
        passedValue: {
          $cond: [
            {
              $and: [
                { $eq: ['$exam.passed', true] },
                { $eq: ['$interview.passed', true] },
              ],
            },
            2,
            {
              $cond: [
                {
                  $or: [
                    { $eq: ['$exam.passed', true] },
                    { $eq: ['$interview.passed', true] },
                  ],
                },
                1,
                0,
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        passedValue: 1,
      },
    },
  ]);
};

export const getModuleById = async ({ moduleId }: { moduleId: string }) => {
  await authAction();

  return await Module.findById(moduleId);
};

export const deletePath = async ({ pathId }: { pathId: string }) => {
  const userId = await authAction();
  const path = await Path.findById(pathId).select('_id userId');

  if (String(path?.userId) !== userId)
    throw new Error('This path does not belong to you');

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    await Promise.all([
      Module.deleteMany({ pathId }),
      Interview.deleteMany({ pathId }),
      InterviewAttempt.deleteMany({ pathId }),
      Exam.deleteMany({ pathId }),
      ExamAttempt.deleteMany({ pathId }),
      Path.findByIdAndDelete(pathId),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }

  revalidatePath('/dashboard/paths');
};

export const updatePath = async ({
  pathId,
  data,
}: {
  pathId: string;
  data: Partial<IPathDocument>;
}) => {
  await authAction();
  const test = await Path.findByIdAndUpdate(pathId, data);

  revalidatePath('/dashboard/paths');
};
