import types from './types';

const INITIAL_STATE = {
  showSpinner: false,
  navData: {
    brand: {},
    menu: [],
  },
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_NAV_JSON: {
      return {
        ...state,
        showSpinner: true,
        navData: {
          brand: {},
          menu: [],
        },
      };
    }

    case types.RECEIVE_NAV_JSON: {
      const { navData } = action;
      return {
        ...state,
        navData,
        showSpinner: false,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
