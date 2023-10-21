import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getTodayDate } from '../actions/common';

const initialState:any = {
    nutritionDate: getTodayDate(),
    isDisplayAddFood: false,
    isDisplayNotes: false,
    isDisplayDining: false,
    nutritionData: [],
    foodData: {results: [], total: -1},
    foodDataResponse: {results:[], resultsv2: {}},
    diningInfo: {'cuisine': {}, 'restaurant': {}},
    userName: '',
    searchRestaurants: [],
    diningInfoSelected: {'cuisine': {content:[]}, 'restaurant': {content:[], contentName: ''}},
    selectedwaternote: '',
    selectedFood: [],
    selectedItemIndex: 0,
    filteredSubstitutionList: [],
    weekList: [],
    totals: {
      pcals: 0,
      pprotein: 0,
      pfat: 0,
      pcarbs: 0
    },
    searchedSubstitution: ''
};
const initialFunction:any = () => {};

const NutritionContext = React.createContext([initialState, initialFunction]);

const NutritionProvider = (props: { children: any; }) => {
  const [state, setState] = useState(initialState);

  const { children } = props;
  return (
    <NutritionContext.Provider value={[state, setState]}>
      {children}
    </NutritionContext.Provider>
  );
};

NutritionProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { NutritionContext, NutritionProvider };
