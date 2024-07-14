import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Input } from './input';

type RadioProps = {
  options: {
    label: string;
    value: string;
  }[];
  register: UseFormRegister<FieldValues>;
  fieldName: string;
};

const Radio = ({ options, register, fieldName }: RadioProps) => {
  return (
    <ul className='flex flex-wrap gap-3 justify-center mb-2'>
      {options.map(option => (
        <li key={option.value}>
          <Input
            id={option.value}
            type='radio'
            value={option.value}
            className='hidden peer'
            {...register(fieldName, { required: 'Must choose one option' })}
          />
          <label
            htmlFor={option.value}
            className='peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500 border border-input flex gap-5 items-center px-4 py-2 rounded-lg shadow cursor-pointer tracking-tight dark:bg-background-2/40 lg:px-10 lg:py-3 font-medium hover:bg-accent transition-colors'
          >
            <div>
              <h3>{option.label}</h3>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Radio;
