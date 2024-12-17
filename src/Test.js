import React from 'react';
// import logo from './Bilder/logo.svg';
import logo from './Bilder/eksempel.png';
//import eksempel from 'src/Bilder/eksempel.png';
import './App.css';
//import Bilde from './Kode.js/Bilde.js';
// import Bilde from './Kode.js/Bilde.js';

function Test() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Bilde/> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default Test; // Export it as the default component for App.js