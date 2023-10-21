import React from 'react';
import GoalsBody from './goals';
import { GoalsProvider } from '../../context/goalsContext';
import './Goals.css';

const Goals = (props:any) => {
  return (
    <GoalsProvider>
      <GoalsBody {...props} />
    </GoalsProvider>
  );
};

export default Goals;
