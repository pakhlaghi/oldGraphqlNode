import types from './types';

const requestNavJson = () => {
    type: types.REQUEST_NAV_JSON
};

const receiveNavJson = (json) => {
    type: types.RECEIVE_NAV_JSON,
    navData: json
}

export default {
  requestNavJson,
  receiveNavJson,
};
