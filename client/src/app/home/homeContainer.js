import { connect } from 'react-redux';
import HomeComponent from './homeComponent';

const mapStateToProps = (state) => {
  const { navData } = state.app;
  return { navData };
};

const Home = connect(mapStateToProps)(HomeComponent);

export default Home;
