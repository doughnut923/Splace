
import './App.css';
import * as React from 'react';
import { useState } from 'react';
import ImageLoader from './ImageLoader';
import LocationContext from "./LocationContext"
import LocationImages from "./LocationImages"
import LocationTitle from './LocationTitle';

function PointAdder({ addPoints, setCurrDesc, currDesc, currTitle, setCurrTitle }) {

  const { inputPhase, setInputPhase } = useState(0);

  return (
    <>
      <div className="sidebar">

        <div id='exit-button'>
          <span class="material-symbols-outlined">
            close
          </span>
        </div>

        <div className='add-context-section'>
          <form className='input-field-container'>
            <div className='input-field'>
              <h1 className="input-title">【題】</h1>
              <input className="input-field-single" value={currTitle} type='text' onChange={e => {
                setCurrTitle(e.target.value);
              }}></input>
              <h1 className="input-title">【文】</h1>
              <textarea className='input-field-large' value={currDesc} type='text' onChange={e => {
                setCurrDesc(e.target.value);
              }}></textarea>
            </div>
            <button id="submit-context" type="button" onClick={addPoints} className='btn'>續</button>
          </form>
        </div>

        <div className='add-image-section'>
          <div className='input-field-container'>
            <h1 className='input-title'>【映】</h1>
            <ImageLoader />
            <form>
              <input type='file' id="image-upload" name='filename'></input>
              <button id="submit-image" type="button" onClick={addPoints} className='btn'>結</button>
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
