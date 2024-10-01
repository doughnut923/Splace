
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader.tsx';
import LocationContext from "./LocationContext.tsx"
import LocationImages from "./LocationImages.tsx"
import LocationTitle from './LocationTitle.tsx';

function PointAdder({ showSidebar, setShowSidebar, addPoints, setCurrDesc, currDesc, currTitle, setCurrTitle }) {

  const [inputPhase, setInputPhase] = useState<0 | 1>(0);
  const [images, setImages] = useState<File | null>();

  function handleImage(file : File | null){
    console.log(file);

    if(file == null){
      console.error("No Files Selected.");
    }

    setImages (file)
  }

  useEffect(() =>{
    console.log("Image CHANGEDD!!!");
  }, [images])

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
              <textarea className='input-field-large' placeholder="你做咗啲乜？" value={currDesc} onChange={e => {
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
              <input type='file' id="image-upload" name='filename' onChange=
                {(e) => handleImage(e.target.files[0])}
              ></input>
              <button id="submit-image" type="button" onClick={(e) => {
                addPoints(images);
                setInputPhase(0);
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
