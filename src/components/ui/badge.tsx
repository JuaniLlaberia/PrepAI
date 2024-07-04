export type ColorsType =
  | 'red'
  | 'green'
  | 'blue'
  | 'gray'
  | 'purple'
  | 'orange'
  | 'yellow';

type BadgeType = {
  text: string;
  color: ColorsType;
  decorated?: boolean;
};

const getColorClass = (color: ColorsType) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-800 dark:border-red-400',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-800 dark:border-blue-400',
    green:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-800 dark:border-green-400',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-800 dark:border-gray-400',
    purple:
      'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-300 border-purple-800 dark:border-purple-400',
    orange:
      'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-300 border-orange-800 dark:border-orange-400',
    yellow:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300 border-yellow-800 dark:border-yellow-400',
  };

  return colorClasses[color] || colorClasses.gray;
};

const Badge = ({ text, color, decorated = false }: BadgeType) => {
  return (
    <span
      className={`inline-flex capitalize items-center rounded-lg px-3 border py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getColorClass(
        color
      )}`}
    >
      {decorated && (
        <span
          className={`size-1.5 border-[3.5px] ${getColorClass(
            color
          )} rounded-full`}
        ></span>
      )}
      {text}
    </span>
  );
};

export default Badge;
