import React from 'react';
import FeedbackBody from './feedback';
import { FeedbackProvider } from '../../context/feedbackContext';
import './Feedback.css';

const Login = (props:any) => {
  return (
    <FeedbackProvider>
      <FeedbackBody {...props} />
    </FeedbackProvider>
  );
};

export default Login;
