import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default (props) => (
  <div>
    <Header dopplerUserData={props.dopplerUserData} />
    <img src={logo} alt="logo" />
    <Footer />
  </div>
);
