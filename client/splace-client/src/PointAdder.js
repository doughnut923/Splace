
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';
import LocationContext from "./LocationContext"
import LocationImages from "./LocationImages"
import LocationTitle from './LocationTitle';

function PointAdder({ showSidebar, setShowSidebar, addPoints, setCurrDesc, currDesc, currTitle, setCurrTitle }) {

  const [inputPhase, setInputPhase] = useState(0);

  return (
    <>
      <div className={showSidebar ? "show-sidebar sidebar" : "sidebar"}>

        <div id='exit-button' onClick={() => {
          console.log(1);
          setShowSidebar(0);
        }} >
          <span className="material-symbols-outlined">
            close
          </span>
        </div>

        <div className={!inputPhase ? 'show add-context-section' : 'add-context-section'}>
          <form className='input-field-container'>
            <div className='input-field'>
              <h1 className="input-title">【題】</h1>
              <input className="input-field-single" value={currTitle} type='text' onChange={e => {
                setCurrTitle(e.target.value);
              }}></input>
              <h1 className="input-title">【文】</h1>
              <textarea className='input-field-large' placeholder="你做咗啲乜？" value={currDesc} type='text' onChange={e => {
                setCurrDesc(e.target.value);
              }}></textarea>
            </div>
            <button id="submit-context" type="button" onClick={() => {
              setInputPhase(1);
            }} className='btn'>續</button>
          </form>
        </div>

        <div className={inputPhase ? "add-image-section show" : "add-image-section"}>
          <div className='input-field-container'>
            <h1 className='input-title'>【映】</h1>
            <ImageLoader />
            <form>
              <input type='file' id="image-upload" name='filename'></input>
              <button id="submit-image" type="button" onClick={() => {
                setInputPhase(0);
                addPoints();
              }} className='btn'>結</button>
            </form>
          </div>
        </div>

        <div className='display-info-section'>
          <div className='info-wrap'>
            <LocationTitle />
            <LocationImages />
            <LocationContext />
          </div>
        </div>

      </div>
    </>
  );
}

export default PointAdder;
