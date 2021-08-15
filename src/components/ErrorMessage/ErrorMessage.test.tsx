import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('renders with message from error', () => {
  render(<ErrorMessage error={{ type: 'validate', message: 'A message' }} />);

  const cardNumber = screen.getByText(/A message/i);
  expect(cardNumber).toBeInTheDocument();
});

test('renders with required message if required', () => {
  render(<ErrorMessage error={{ type: 'required' }} />);

  const cardNumber = screen.getByText(/Field is required/i);
  expect(cardNumber).toBeInTheDocument();
});

test('renders with default message if any other type', () => {
  render(<ErrorMessage error={{ type: 'min' }} />);

  const cardNumber = screen.getByText(/Field is invalid/i);
  expect(cardNumber).toBeInTheDocument();
});
