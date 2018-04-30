import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../shared/nav';
import Header from '../shared/header';

const HomeComponent = ({ navData, fetchNavJson }) => (
  <div>
    <Nav navData={navData} />
    <Header />
    <button onClick={() => fetchNavJson()}>Get Nav</button>
  </div>
);

HomeComponent.propTypes = {
  navData: PropTypes.shape({
    brand: PropTypes.object,
    menu: PropTypes.array,
  }).isRequired,
  fetchNavJson: PropTypes.func.isRequired,
};

export default HomeComponent;
