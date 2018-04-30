import axios from 'axios';
import actions from './actions';

const { requestNavJson, receiveNavJson } = actions;
// 'fetchSubredditJson()' will fetch the JSON data from the subreddit,
// extract the required information and update the Redux store with it.
const fetchNavJson = () => (dispatch) => {
  // Dispatching this action will toggle the 'showRedditSpinner'
  // flag in the store, so that the UI can show a loading icon.
  dispatch(requestNavJson());

  axios.get('assets/data/navData.json').then((json) => {
    dispatch(receiveNavJson(json.data));
  });
};
export default {
  fetchNavJson,
};
