import { connect } from 'react-redux';
import HomeComponent from './homeComponent';
import { appOperations } from '../core';

const mapStateToProps = (state) => {
  const { navData } = state.app;
  return { navData };
};

const mapDispatchToProps = (dispatch) => {
  const fetchNavJsonProp = () => {
    dispatch(appOperations.fetchNavJson());
  };

  return { fetchNavJsonProp };
};

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;
