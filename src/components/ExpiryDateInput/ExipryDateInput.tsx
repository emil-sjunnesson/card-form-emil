import React from 'react';
import {
  DeepMap,
  FieldError,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { IFormInputs } from '../CardForm/CardForm';
import SelectInput from '../SelectInput/SelectInput';
import styles from './ExpiryDateInput.module.scss';
import { getMonths, getYears } from './utils';

const isMonthValid = (value: string, selectedYear: string) => {
  const today = new Date();
  if (parseInt(selectedYear) === today.getFullYear()) {
    return parseInt(value) >= today.getMonth();
  }
  return getMonths().some((month) => month === value);
};

const isYearValid = (value: string) =>
  getYears().some((year) => year === value);

export interface ExpiryDateInputProps {
  register: UseFormRegister<IFormInputs>;
  errors: DeepMap<IFormInputs, FieldError>;
  getFormValues: UseFormGetValues<IFormInputs>;
}

const ExpiryDateInput: React.FC<ExpiryDateInputProps> = ({
  getFormValues,
  ...props
}) => (
  <div className={styles.expiryDateInput}>
    <label>Expiration Date</label>
    <div className={styles.selectors}>
      <SelectInput
        {...props}
        id="month"
        placeholder="Month"
        options={getMonths()}
        registerOptions={{
          validate: (value) =>
            isMonthValid(value, getFormValues('year')) || 'Invalid month',
        }}
      />
      <SelectInput
        {...props}
        id="year"
        placeholder="Year"
        options={getYears()}
        registerOptions={{
          validate: (value) => isYearValid(value) || 'Invalid year',
        }}
      />
    </div>
  </div>
);

export default ExpiryDateInput;
