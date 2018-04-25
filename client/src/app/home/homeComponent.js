import React from 'react';
import Nav from '../shared/nav';
import Header from '../shared/header';

const HomeComponent = ({ navData }) => (
  <div>
    <Nav navData={navData} />
    <Header />
  </div>
);

export default HomeComponent;
