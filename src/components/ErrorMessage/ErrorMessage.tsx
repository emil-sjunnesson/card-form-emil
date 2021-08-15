import React from 'react';
import { FieldError } from 'react-hook-form';
import styles from './ErrorMessage.module.scss';

export interface ErrorMessageProps {
  error: FieldError | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  let { message, type } = error;
  if (!message) {
    switch (type) {
      case 'required':
        message = 'Field is required';
        break;
      default:
        message = 'Field is invalid';
        break;
    }
  }

  return <span className={styles.errorMsg}>⚠ {message}</span>;
};

export default ErrorMessage;
