import { ReactNode } from 'react';
import { Label } from './ui/label';

const InputWrapper = ({
  children,
  label,
  inputId,
  error,
}: {
  children: ReactNode;
  label?: string;
  inputId: string;
  error?: string;
}) => {
  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>
      {children}
      {error && error.length > 0 ? (
        <p className='text-sm px-1 text-red-500'>{error}</p>
      ) : null}
    </div>
  );
};

export default InputWrapper;
