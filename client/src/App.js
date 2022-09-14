import './App.css';
import React from 'react';
import  { Route } from  'react-router-dom';
import LandingPage from './components/landingPage/landingPage.jsx';
import CountryCard from './components/countryCard/countryCard.jsx';
import Countries from './components/countries/countries.jsx';

function  App(){
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage/> 
      </Route>
      <Route exact path="/Home"> 
        <Countries/>
      </Route>
    </div>
  );
}

export default App;
