import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import useCardData from '../../hooks/useGetCardData';
import CardNumberInput from '../CardNumberInput/CardNumberInput';
import ExpiryDateInput from '../ExpiryDateInput/ExipryDateInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import TextInput from '../TextInput/TextInput';
import styles from './CardForm.module.scss';

export interface IFormInputs {
  cardNumber: string;
  cardName: string;
  month: string;
  year: string;
  cvv: string;
}

export interface CardFormProps {
  onSubmitSuccess: (data: IFormInputs) => void;
}

const CardForm: React.FC<CardFormProps> = ({ onSubmitSuccess }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = useForm<IFormInputs>({ mode: 'onTouched' });

  const onSuccess: SubmitHandler<IFormInputs> = (data) => onSubmitSuccess(data);

  const onFail: SubmitErrorHandler<IFormInputs> = (errors) =>
    console.log('Submit error:', errors);

  const sharedProps = { register, errors };

  const { cardType, cvvRestrictions } = useCardData(watch('cardNumber'));

  return (
    <form
      className={styles.cardForm}
      onSubmit={handleSubmit(onSuccess, onFail)}
    >
      <CardNumberInput cardType={cardType} {...sharedProps} />
      <TextInput
        id="cardName"
        label="Card Name"
        registerOptions={{
          maxLength: { value: 20, message: 'Name need to be 20 chars or less' },
        }}
        maxLength={20}
        {...sharedProps}
      />
      <div className={styles.row}>
        <ExpiryDateInput getFormValues={getValues} {...sharedProps} />
        <TextInput
          id="cvv"
          label="CVV"
          mask={cvvRestrictions.mask}
          registerOptions={{
            pattern: {
              value: cvvRestrictions.regex,
              message: 'CVV not valid for provided card number',
            },
          }}
          {...sharedProps}
        />
      </div>
      <SubmitButton text="Submit" />
    </form>
  );
};

export default CardForm;
