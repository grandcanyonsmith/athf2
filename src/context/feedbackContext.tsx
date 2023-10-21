import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState:any = {};
const initialFunction:any = () => {};
const FeedbackContext = React.createContext([initialState, initialFunction]);

const FeedbackProvider = (props: { children: any; }) => {
  const [state, setState] = useState({
    name: 'Feedback',
    imagesList: []
  });

  const { children } = props;
  return (
    <FeedbackContext.Provider value={[state, setState]}>
      {children}
    </FeedbackContext.Provider>
  );
};

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { FeedbackContext, FeedbackProvider };
