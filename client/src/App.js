import './App.css';
import React from 'react';
import CountryCard from './components/countryCard/countryCard.jsx';

function  App(){
  return (
    <div className="App">
      <header className="App-header">
        <CountryCard/>
      </header>
    </div>
  );
}

export default App;
