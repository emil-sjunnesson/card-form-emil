import { useEffect, useState } from 'react';

export enum CardType {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMERICAN EXPRESS',
  OTHER = 'OTHER',
}

const defaultCvvRestrictions = {
  regex: /^\d{3}$/,
  mask: [/\d/, /\d/, /\d/],
};

const identifyCardType = (cardNumber: string) => {
  if (/^4/.test(cardNumber)) {
    return CardType.VISA;
  } else if (/^5[1-5]/.test(cardNumber)) {
    return CardType.MASTERCARD;
  } else if (/^3[47]/.test(cardNumber)) {
    return CardType.AMEX;
  } else {
    return CardType.OTHER;
  }
};

// Hook used to get card data from number
const useCardData = (cardNumber: string) => {
  const [cardType, setCardType] = useState(CardType.OTHER);
  const [cvvRestrictions, setCvvRestrictions] = useState(
    defaultCvvRestrictions
  );

  useEffect(() => setCardType(identifyCardType(cardNumber)), [cardNumber]);

  useEffect(() => {
    if (cardType === CardType.AMEX) {
      setCvvRestrictions({
        regex: /^\d{4}$/,
        mask: [/\d/, /\d/, /\d/, /\d/],
      });
    } else {
      setCvvRestrictions(defaultCvvRestrictions);
    }
  }, [cardType]);

  return { cardType, cvvRestrictions };
};

export default useCardData;
