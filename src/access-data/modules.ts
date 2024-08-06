import mongoose from 'mongoose';

import Exam from '@/db/models/Exam';
import Interview from '@/db/models/Interview';
import InterviewAttempt from '@/db/models/InterviewAttempt';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import Module, { IModuleDocument } from '@/db/models/Modules';
import {
  generateExamWithGemini,
  generateInterviewFeedbackWithGemini,
  generateInterviewWithGemini,
} from '@/gemini/functions';
import { getAuthUser } from '@/actions/user';
import { DifficultyEnum, ExamTypeEnum } from '@/lib/validators';
import { IPathDocument } from '@/db/models/Path';
import { IProjectActivity, IRevisionActivity } from '@/db/models/Activity';

export const getModules = async ({
  pathId,
}: {
  pathId: string;
}): Promise<IModuleDocument[]> => {
  await getAuthUser();

  return await Module.aggregate([
    { $match: { pathId: new mongoose.Types.ObjectId(pathId) } },
    {
      $addFields: {
        completedActivities: {
          $size: {
            $filter: {
              input: '$activities',
              as: 'activity',
              cond: { $eq: ['$$activity.completed', true] },
            },
          },
        },
      },
    },
    {
      $addFields: {
        activitiesLength: { $size: '$activities' },
      },
    },
    {
      $sort: { order: 1 },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        inProgress: 1,
        completed: 1,
        completedActivities: 1,
        activitiesLength: 1,
        slug: 1,
        examType: 1,
        order: 1,
      },
    },
  ]);
};

export const getModuleBySlug = async ({
  slug,
  pathId,
}: {
  slug: string;
  pathId: string;
}) => {
  await getAuthUser();

  const moduleData = await Module.findOne({ pathId, slug }).lean();
  return JSON.parse(JSON.stringify(moduleData)) as IModuleDocument;
};

export const getModuleRevision = async ({
  pathId,
  moduleSlug,
}: {
  pathId: string;
  moduleSlug: string;
}) => {
  const revisionData = await Module.findOne({
    pathId,
    slug: moduleSlug,
    'activities.type': 'revision',
  }).select('activities.$');

  if (!revisionData) throw new Error('Not found');

  return revisionData.activities[0] as IRevisionActivity;
};

export const getModuleProject = async ({
  pathId,
  moduleSlug,
}: {
  pathId: string;
  moduleSlug: string;
}) => {
  const revisionData = await Module.findOne({
    pathId,
    slug: moduleSlug,
    'activities.type': 'project',
  }).select('activities.$');

  if (!revisionData) throw new Error('Not found');

  return revisionData.activities[0] as IProjectActivity;
};

export const updateModule = async ({
  moduleId,
  module,
}: {
  moduleId: string;
  module: Partial<IModuleDocument>;
}) => {
  await Module.findByIdAndUpdate(moduleId, module);
};

export const completeActivity = async ({
  moduleId,
  moduleSlug,
  activityId,
}: {
  moduleId?: string;
  moduleSlug?: string;
  activityId: string;
}) => {
  const filter = moduleId
    ? { _id: new mongoose.Types.ObjectId(moduleId) }
    : {
        slug: moduleSlug,
      };

  await Module.findOneAndUpdate(
    filter,
    {
      $set: { 'activities.$[e1].completed': true },
    },
    {
      arrayFilters: [
        {
          'e1._id': activityId,
        },
      ],
    }
  );
};

export const createExamForModule = async ({
  moduleId,
  activityId,
  difficulty,
  type,
}: {
  moduleId: string;
  activityId: string;
  difficulty: DifficultyEnum;
  type: ExamTypeEnum;
}) => {
  const moduleDB = await Module.findById(moduleId).select('_id subject pathId');
  if (!moduleDB) throw new Error('Invalid module ID');

  const { subject, pathId } = moduleDB;

  const questions = await generateExamWithGemini({
    subject,
    difficulty,
    type,
  });

  const { id } = await Exam.create({
    subject,
    difficulty,
    questions,
    pathId,
    moduleId,
    activityId,
  });

  await Module.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(moduleId),
      'activities.type': 'exam',
    },
    {
      $set: { 'activities.$[e1].examId': id },
    },
    {
      arrayFilters: [
        {
          'e1._id': activityId,
        },
      ],
    }
  );

  return { id };
};

export const updateExamAttemptFromModule = async ({
  examId,
  examAttempt,
  moduleId,
}: {
  examId: string;
  examAttempt: Partial<IExamAttemptDocument>;
  moduleId: string;
}) => {
  const { passed, score, time, answers } = examAttempt;

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    if (passed) {
      const exam = await Exam.findById(examId).select('_id activityId');

      await Module.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(moduleId),
          'activities.type': 'exam',
        },
        {
          $set: {
            'activities.$[e1].passed': true,
            'activities.$[e1].completed': true,
          },
        },
        {
          arrayFilters: [
            {
              'e1._id': exam?.activityId,
            },
          ],
        }
      );
    }

    await Promise.all([
      ExamAttempt.updateOne(
        { examId },
        {
          $max: { score },
          passed,
          time,
          answers,
        }
      ),
      Exam.findByIdAndUpdate(examId, { taken: true, passed }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }
};

export const createInterviewForModule = async ({
  moduleId,
  activityId,
}: {
  moduleId: string;
  activityId: string;
}) => {
  const moduleDB = await Module.findById(moduleId)
    .select('_id subject title')
    .populate<{ pathId: Pick<IPathDocument, '_id' | 'jobExperience'> }>(
      'pathId',
      '_id jobExperience'
    );

  if (!moduleDB) throw new Error('Invalid module ID');

  const {
    subject,
    title,
    pathId: { _id: pathId, jobExperience },
  } = moduleDB;

  const questions = await generateInterviewWithGemini({
    jobRole: subject,
    jobDescription: title,
    jobExperience,
  });

  const { id } = await Interview.create({
    jobRole: subject,
    jobDescription: title,
    jobExperience,
    questions,
    moduleId,
    pathId,
    activityId,
  });

  await Module.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(moduleId),
      'activities.type': 'interview',
    },
    {
      $set: { 'activities.$[e1].interviewId': id },
    },
    {
      arrayFilters: [
        {
          'e1._id': activityId,
        },
      ],
    }
  );

  return { id };
};

export const createInterviewAttemptFeedbackForModule = async ({
  userResponses,
  interviewId,
  moduleId,
}: {
  userResponses: {
    question: string;
    answer: string;
  }[];
  interviewId?: string;
  moduleId: string;
}) => {
  const { answers, speechAnalysis } = await generateInterviewFeedbackWithGemini(
    { userResponses }
  );

  const score =
    answers.reduce((prev, crr) => prev + crr.score, 0) / answers.length;
  const passed = score >= 6;

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    if (passed) {
      const interview = await Interview.findById(interviewId).select(
        '_id activityId'
      );

      await Module.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(moduleId),
          'activities.type': 'interview',
        },
        {
          $set: {
            'activities.$[e1].passed': true,
            'activities.$[e1].completed': true,
          },
        },
        {
          arrayFilters: [
            {
              'e1._id': interview?.activityId,
            },
          ],
        }
      );
    }

    await Promise.all([
      InterviewAttempt.updateOne(
        { interviewId },
        {
          $max: { score },
          passed,
          answers,
          speechAnalysis,
        }
      ),
      Interview.findByIdAndUpdate(interviewId, { taken: true, passed }),
    ]);
  } catch (err) {
    await mongoSession.abortTransaction();
  } finally {
    mongoSession.endSession();
  }
};
