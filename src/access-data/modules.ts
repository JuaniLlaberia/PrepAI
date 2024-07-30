import mongoose from 'mongoose';

import Exam from '@/db/models/Exam';
import ExamAttempt, { IExamAttemptDocument } from '@/db/models/ExamAttempt';
import Module from '@/db/models/Modules';
import { IPathDocument } from '@/db/models/Path';
import { generateExamWithGemini } from '@/gemini/functions';

export const createExamForModule = async ({
  moduleId,
}: {
  moduleId: string;
}) => {
  //Find module's path data
  const moduleDB = await Module.findById(moduleId)
    .select('_id topics.label subject pathId')
    .populate<Pick<IPathDocument, 'jobExperience'>>('pathId', 'jobExperience');
  if (!moduleDB) throw new Error('Invalid module ID');

  //@ts-ignore
  const experience = moduleDB.pathId.jobExperience;
  const difficulty =
    experience === 'senior' || experience === 'lead' ? 'hard' : 'medium';

  //Generate exam questions & create exam
  const questions = await generateExamWithGemini({
    subject: moduleDB.subject,
    difficulty,
  });

  const { id } = await Exam.create({
    subject: moduleDB.subject,
    difficulty,
    questions,
    moduleId,
    pathId: moduleDB.pathId,
  });

  //Store the exam id in the module object
  await Module.findByIdAndUpdate(moduleId, {
    exam: { passed: false, examId: id },
  });

  return { id };
};

export const updateExamAttemptFromModule = async ({
  examId,
  attemptId,
  examAttempt,
  moduleId,
}: {
  examId: string;
  attemptId: string;
  examAttempt: Partial<IExamAttemptDocument>;
  moduleId: string;
}) => {
  if (examAttempt.passed) {
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      await Promise.all([
        Module.findByIdAndUpdate(moduleId, {
          exam: { passed: true },
        }),
        Exam.findByIdAndDelete(examId),
        ExamAttempt.deleteMany({ examId }),
      ]);
    } catch (err) {
      await mongoSession.abortTransaction();
    } finally {
      mongoSession.endSession();
    }
  } else {
    await ExamAttempt.findByIdAndUpdate(attemptId, {
      ...examAttempt,
      examId,
    });
  }
};
