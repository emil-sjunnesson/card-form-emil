import React from 'react';
import classNames from 'classnames';
import {
  DeepMap,
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { IFormInputs } from '../CardForm/CardForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './SelectInput.module.scss';

export interface SelectInputProps {
  id: keyof IFormInputs;
  placeholder: string;
  options: string[];
  register: UseFormRegister<IFormInputs>;
  errors: DeepMap<IFormInputs, FieldError>;
  registerOptions?: RegisterOptions;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  placeholder,
  options,
  register,
  errors,
  registerOptions,
  required = true,
  ...props
}) => {
  const error = errors[id];

  return (
    <div className={classNames(styles.selectInput, { [styles.error]: error })}>
      <select
        id={id}
        defaultValue=""
        {...props}
        {...register(id, { required, ...registerOptions })}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </div>
  );
};

export default SelectInput;
