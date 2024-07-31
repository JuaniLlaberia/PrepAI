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
            className='peer-checked:bg-[#4e79ee] peer-checked:text-white peer-checked:border-[#4e79ee] border lg:border-2 border-border flex gap-5 items-center px-4 py-2 rounded-lg shadow cursor-pointer dark:bg-background-2/40 lg:px-10 lg:py-3 font-medium md:hover:bg-background-2 transition-colors'
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
