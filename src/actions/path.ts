'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import Module from '@/db/models/Modules';
import Path, { IPathDocument } from '@/db/models/Path';
import { authAction } from './auth';
import { model } from '@/gemini';

export const getUserPaths = async ({
  sort,
}: {
  sort: 'createdAt' | 'name';
}) => {
  const userId = await authAction();

  return await Path.find({ userId })
    .select('_id jobPosition jobExperience completed createdAt')
    .sort(
      sort === 'createdAt'
        ? { pinned: 'desc', createdAt: 'desc' }
        : { pinned: 'desc', jobRole: 'desc' }
    );
};

export const getPathById = async ({ pathId }: { pathId: string }) => {
  const userId = await authAction();

  const path = await Path.findById(pathId);
  if (String(path?.userId) !== userId)
    throw new Error('This path does not belong to you');

  return path;
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

  const prompt = `Generate a list of modules (min 5, max 10) to get an user prepare for it's interviews for a ${jobExperience}
   level job position as a ${jobPosition} with the next topics: ${topics}. Each module should have
   the next data: {title (topic), description (what this module includes), topics: {label (topic name) , link (reference to this topic in order for the user to learn/practice it)}(include at least 5 references for each)}.
   Return it as a json based on the schema I exaplained.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonData = response.text();

  console.log(jsonData);

  const modules: {
    title: string;
    description: string;
    topics: { label: string; link: string }[];
  }[] = JSON.parse(jsonData).modules;

  const { id } = await Path.create({
    jobPosition,
    jobExperience,
    topics,
    userId,
    modules,
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

  return await Module.find({ pathId }).select('_id title');
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

  //DELETE INTERVIEWS/EXAMS RELATED TO THIS PATH
  try {
    await Promise.all([
      Module.deleteMany({ pathId }),
      Path.findByIdAndDelete(pathId),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }

  revalidatePath('/dashboard/paths');
};
