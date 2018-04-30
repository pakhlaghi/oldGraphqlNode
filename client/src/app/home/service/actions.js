import types from './types';

const incrementCount = value => ({ type: types.INCREMENT_COUNT, value });

const decrementCount = value => ({
  type: types.DECREMENT_COUNT,
  value,
});

export default {
  incrementCount,
  decrementCount,
};
