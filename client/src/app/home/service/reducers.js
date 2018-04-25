import types from './types';

const INITIAL_STATE = {
  count: 0,
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INCREMENT_COUNT: {
      return {
        ...state,
        count: state.count + action.value,
      };
    }

    case types.DECREMENT_COUNT: {
      return {
        ...state,
        count: state.count - action.value,
      };
    }

    default:
      return state;
  }
};

export default homeReducer;
