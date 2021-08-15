import React from 'react';
import styles from './SubmitButton.module.scss';

export interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => (
  <button type="submit" className={styles.submitButton}>
    {text}
  </button>
);

export default SubmitButton;
