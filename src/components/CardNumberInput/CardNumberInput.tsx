import React, { useMemo } from 'react';
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';
import { CardType } from '../../hooks/useGetCardData';
import { IFormInputs } from '../CardForm/CardForm';
import TextInput from '../TextInput/TextInput';
import visa from '../../assets/images/visa.svg';
import mastercard from '../../assets/images/mastercard.svg';
import amex from '../../assets/images/amex.svg';
import card from '../../assets/images/default.svg';
import styles from './CardNumberInput.module.scss';

const getRegex = (cardType: CardType) => {
  switch (cardType) {
    case CardType.VISA:
      return /^4\d{12}(?:\d{3})?$/;
    case CardType.MASTERCARD:
      return /^5[1-5]\d{14}/;
    case CardType.AMEX:
      return /^3[47]\d{13}/;
    case CardType.OTHER:
    default:
      return null;
  }
};

const validateCardNumber = (value: string, regex: RegExp | null) => {
  if (regex === null) {
    return 'Card type not supported';
  }
  return regex?.test(value.replaceAll(' ', '')) || 'Invalid card number';
};

export interface SelectInputProps {
  cardType: CardType;
  register: UseFormRegister<IFormInputs>;
  errors: DeepMap<IFormInputs, FieldError>;
}

const SelectInput: React.FC<SelectInputProps> = ({ cardType, ...props }) => {
  const mask = useMemo(() => {
    const d = /\d/;
    if (cardType === CardType.AMEX) {
      return [d, d, d, d, ' ', d, d, d, d, d, d, ' ', d, d, d, d, d];
    }
    return [d, d, d, d, ' ', d, d, d, d, ' ', d, d, d, d, ' ', d, d, d, d];
  }, [cardType]);

  const [src, alt] = useMemo(() => {
    switch (cardType) {
      case CardType.VISA:
        return [visa, 'Visa'];
      case CardType.MASTERCARD:
        return [mastercard, 'Mastercard'];
      case CardType.AMEX:
        return [amex, 'American Express'];
      case CardType.OTHER:
      default:
        return [card, 'Credit card'];
    }
  }, [cardType]);

  return (
    <div className={styles.cardNumberWrapper}>
      <TextInput
        id="cardNumber"
        label="Card Number"
        mask={mask}
        maskGuide
        registerOptions={{
          validate: (value) => validateCardNumber(value, getRegex(cardType)),
        }}
        {...props}
      />
      <img src={src} alt={alt} className={styles.cardIcon} />
    </div>
  );
};

export default SelectInput;
