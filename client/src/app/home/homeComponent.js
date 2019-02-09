import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../shared/nav';
import Header from '../shared/header';

const HomeComponent = ({ navData, fetchNavJsonProp }) => (
  <div>
    <Nav navData={navData} />
    <Header />
    <button onClick={() => fetchNavJsonProp()}>Get Nav</button>
  </div>
);

HomeComponent.propTypes = {
  navData: PropTypes.shape({
    brand: PropTypes.object,
    menu: PropTypes.array,
  }).isRequired,
  fetchNavJsonProp: PropTypes.func.isRequired,
};

export default HomeComponent;
