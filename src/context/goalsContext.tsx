import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {
  goalsData: {
    weight_percent: 0,
    bodyfat_percent: 0,
    muscle_percent: 0,
    weightweekly: 0,
    bodyfatweekly: 0,
    muscleweekly: 0,
    lostweight: 0,
    lostbodyfat: 0,
    gainedmuscle: 0,
    mostrecent_weight: 0,
    mostrecent_bodyfat: 0,
    mostrecent_leanmuscle: 0,
    goalmusclegain: 0,
    goalbodyfat: 0,
    goalweight: 0,
    goalweight_percent: 0,
    goalbodyfat_percent: 0,
    goalmusclegain_percent: 0,
    weight_graph: [],
    musclegain_graph: [],
    bodyfat_graph: [],
    weight_toggle: false,
    bodyfat_toggle: false,
    musclegain_toggle: false,
    completed: 0
  }
};
const initialFunction:any = () => {};

const GoalsContext = React.createContext([initialState, initialFunction]);

const GoalsProvider = (props: { children: any; }) => {
  const [state, setState] = useState(initialState);

  const { children } = props;
  return (
    <GoalsContext.Provider value={[state, setState]}>
      {children}
    </GoalsContext.Provider>
  );
};

GoalsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { GoalsContext, GoalsProvider };
