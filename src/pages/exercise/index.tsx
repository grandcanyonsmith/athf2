import React from 'react';
import ExerciseBody from './exercise';
import { ExerciseProvider } from '../../context/exerciseContext';
import './Exercise.css';

const Login = (props:any) => {
  return (
    <ExerciseProvider>
      <ExerciseBody {...props} />
    </ExerciseProvider>
  );
};

export default Login;
