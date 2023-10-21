import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getTodayDate } from '../actions/common';

const initialState:any = {
  exerciseDate: getTodayDate(),
  exerciseData: [],
  epedata: [],
  selectednote: '',
  selectedExercise: {},
  completed: 0,
  videoData: {},
  isNoRecordsExercise: false,
  weekList: []
};
const initialFunction:any = () => {};

const ExerciseContext = React.createContext([initialState, initialFunction]);

const ExerciseProvider = (props: { children: any; }) => {
  const [state, setState] = useState(initialState);

  const { children } = props;
  return (
    <ExerciseContext.Provider value={[state, setState]}>
      {children}
    </ExerciseContext.Provider>
  );
};

ExerciseProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ExerciseContext, ExerciseProvider };
