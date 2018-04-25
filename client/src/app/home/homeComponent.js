import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../shared/nav';
import Header from '../shared/header';

const HomeComponent = ({ navData }) => (
  <div>
    <Nav navData={navData} />
    <Header />
  </div>
);

HomeComponent.propTypes = {
  navData: PropTypes.shape({
    brand: PropTypes.object,
    menu: PropTypes.array,
  }).isRequired,
};

export default HomeComponent;
