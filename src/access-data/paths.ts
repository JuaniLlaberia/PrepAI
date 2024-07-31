import mongoose from 'mongoose';

import Module from '@/db/models/Modules';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import ExamAttempt from '@/db/models/ExamAttempt';
import Exam from '@/db/models/Exam';
import Path, { IPathDocument } from '@/db/models/Path';
import { getAuthUser } from '@/actions/user';
import { generateModulesWithGemini } from '@/gemini/functions';

export const getUserPaths = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'progress' | 'completed';
}) => {
  const userId = await getAuthUser();

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
  const userId = await getAuthUser();

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
  userId,
  path,
}: {
  userId: string;
  path: Pick<IPathDocument, 'jobPosition' | 'topics' | 'jobExperience'>;
}) => {
  const modules = await generateModulesWithGemini({ ...path });

  const { id } = await Path.create({
    ...path,
    userId,
    modules: modules.length,
  });

  const modulesWithId = modules.map(module => {
    return { ...module, pathId: id };
  });

  await Module.create([...modulesWithId]);

  return id;
};

export const updatePath = async ({
  pathId,
  path,
}: {
  pathId: string;
  path: Partial<IPathDocument>;
}) => {
  await Path.findByIdAndUpdate(pathId, path);
};

export const deletePath = async ({ pathId }: { pathId: string }) => {
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
};
