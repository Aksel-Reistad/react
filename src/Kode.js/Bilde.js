import React from 'react';
import eksempel from './Bilder/eksempel.png';
import './App.css';
function Bilde(){
    return (
        <div className='App'>
            <img src={eksempel('./eksempel.png')} alt="Bilde image" />
        </div>
    );
}

export default Bilde;