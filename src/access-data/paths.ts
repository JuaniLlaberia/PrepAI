import mongoose from 'mongoose';

import Module from '@/db/models/Modules';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import ExamAttempt from '@/db/models/ExamAttempt';
import Exam from '@/db/models/Exam';
import Path, { IPathDocument } from '@/db/models/Path';
import { getAuthUser } from '@/actions/auth';
import { generateModulesWithGemini } from '@/gemini/functions';

export const getUserPaths = async ({
  sort,
  filter,
}: {
  sort: 'createdAt' | 'name';
  filter: 'progress' | 'completed';
}) => {
  const userId = await getAuthUser();

  const paths = await Path.aggregate<IPathDocument>([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        completed: filter === 'completed' ? true : false,
      },
    },
    {
      $lookup: {
        from: 'modules',
        localField: '_id',
        foreignField: 'pathId',
        as: 'modules',
      },
    },
    {
      $addFields: {
        completedModules: {
          $size: {
            $filter: {
              input: '$modules',
              as: 'module',
              cond: { $eq: ['$$module.completed', true] },
            },
          },
        },
        totalModules: { $size: '$modules' },
      },
    },
    {
      $project: {
        _id: 1,
        jobPosition: 1,
        jobExperience: 1,
        completed: 1,
        pinned: 1,
        createdAt: 1,
        completedModules: 1,
        totalModules: 1,
      },
    },
    {
      $sort:
        sort === 'createdAt'
          ? { pinned: -1, createdAt: -1 }
          : { pinned: -1, jobPosition: -1 },
    },
  ]).exec();

  return paths;
};

export const getPathById = async ({
  pathId,
}: {
  pathId: string;
}): Promise<IPathDocument> => {
  const userId = await getAuthUser();

  const path = await Path.findById(pathId).lean();
  if (!path) throw new Error('Path not found');
  if (String(path?.userId) !== userId)
    throw new Error('This path does not belong to you');

  return path;
};

export const createPath = async ({
  userId,
  path,
}: {
  userId: string;
  path: Pick<IPathDocument, 'jobPosition' | 'topics' | 'jobExperience'>;
}) => {
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    const modules = await generateModulesWithGemini({ ...path });

    const { id } = await Path.create({
      ...path,
      userId,
      totalModules: modules.length,
    });

    const modulesWithId = modules.map(module => {
      return { ...module, pathId: id };
    });
    await Module.create([...modulesWithId]);

    return { id };
  } catch (err) {
    await mongoSession.abortTransaction();
    throw err;
  } finally {
    mongoSession.endSession();
  }
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
