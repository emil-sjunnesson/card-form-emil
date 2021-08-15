import React from 'react';
import { render, screen } from '@testing-library/react';
import CardForm from './CardForm';

test('renders form with labels', () => {
  render(<CardForm onSubmitSuccess={() => {}} />);

  const cardNumber = screen.getByText(/Card Number/i);
  expect(cardNumber).toBeInTheDocument();

  const cardName = screen.getByText(/Card Name/i);
  expect(cardName).toBeInTheDocument();

  const expirationDate = screen.getByText(/Expiration Date/i);
  expect(expirationDate).toBeInTheDocument();

  const cvv = screen.getByText(/Cvv/i);
  expect(cvv).toBeInTheDocument();
});
