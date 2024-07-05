import { Difficulty } from '@prisma/client';

import Badge, { ColorsType } from '@/components/ui/badge';

const difficultyColors = {
  easy: 'green',
  medium: 'yellow',
  hard: 'red',
};

const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
  return (
    <Badge
      text={`${difficulty}`}
      color={difficultyColors[difficulty] as ColorsType}
    />
  );
};

export default DifficultyBadge;
