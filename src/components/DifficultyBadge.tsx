import Badge, { ColorsType } from '@/components/ui/badge';

const difficultyColors = {
  easy: 'yellow',
  medium: 'orange',
  hard: 'red',
};

const DifficultyBadge = ({
  difficulty,
}: {
  difficulty: 'easy' | 'medium' | 'hard';
}) => {
  return (
    <Badge
      text={`${difficulty}`}
      color={difficultyColors[difficulty] as ColorsType}
    />
  );
};

export default DifficultyBadge;
