import UserFeedback from '@/db/models/UserFeedback';

export const createUserFeedback = async ({
  email,
  feedback,
}: {
  email: string;
  feedback: string;
}) => {
  await UserFeedback.create({ email, feedback });
};
