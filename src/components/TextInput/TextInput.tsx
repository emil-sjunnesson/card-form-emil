import React from 'react';
import classNames from 'classnames';
import MaskedInput, { maskArray } from 'react-text-mask';
import {
  DeepMap,
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { IFormInputs } from '../CardForm/CardForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TextInput.module.scss';

export interface TextInputProps {
  id: keyof IFormInputs;
  label?: string;
  register: UseFormRegister<IFormInputs>;
  errors: DeepMap<IFormInputs, FieldError>;
  registerOptions?: RegisterOptions;
  required?: boolean;
  mask?: maskArray | ((value: string) => maskArray);
  maskGuide?: boolean;
  minLength?: number;
  maxLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  register,
  errors,
  registerOptions,
  required = true,
  mask,
  maskGuide = false,
  minLength,
  maxLength,
  ...props
}) => {
  const error = errors[id];
  const inputProps = {
    id,
    minLength,
    maxLength,
    ...props,
    ...register(id, { required, ...registerOptions }),
  };

  return (
    <div className={classNames(styles.textInput, { [styles.error]: error })}>
      {label && <label htmlFor={id}>{label}</label>}
      {mask ? (
        <MaskedInput mask={mask} guide={maskGuide} {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
      <ErrorMessage error={error} />
    </div>
  );
};

export default TextInput;
