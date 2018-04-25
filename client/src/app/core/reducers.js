import types from './types';

const INITIAL_STATE = {
  navData: {
    brand: {
      text: 'Code Core',
      imgUrl: 'https://getbootstrap.com/assets/brand/bootstrap-solid.svg',
    },
    menu: [
      {
        id: 1,
        text: 'Home',
        link: '#',
        pId: 0,
        order: 1,
      },
      {
        id: 2,
        text: 'About',
        link: 'About',
        pId: 0,
        order: 2,
      },
      {
        id: 3,
        text: 'Portfolio',
        link: 'Portfolio',
        pId: 0,
        order: 3,
      },
      {
        id: 4,
        text: 'Team',
        link: 'Team',
        pId: 0,
        order: 4,
      },
      {
        id: 5,
        text: 'Contact',
        link: 'Contact',
        pId: 0,
        order: 5,
      },
    ],
  },
};

const appReducer = (state = INITIAL_STATE, action) => {
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

export default appReducer;
