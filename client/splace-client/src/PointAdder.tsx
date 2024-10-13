
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader.tsx';
import LocationContext from "./LocationContext.tsx"
import LocationImages from "./LocationImages.tsx"
import LocationTitle from './LocationTitle.tsx';

function PointAdder({ showSidebar, setShowSidebar, addPoints, setCurrDesc, currDesc, currTitle, setCurrTitle, resetQuery }) {

  const [inputPhase, setInputPhase] = useState<0 | 1>(0);
  const [images, setImages] = useState<File | null>();
  const [imageUrl, setImagesUrl] = useState<String>("");
  const [showHint, setShowHint] = useState<0 | 1>(0)

  function handleImage(file: File | null) {
    console.log(file);

    if (!file) {
      console.error("No Files Selected.");
      return;
    }
    setImagesUrl(URL.createObjectURL(file));
    setImages(file);
  }

  return (
    <>
      <div className={showSidebar ? "show-sidebar sidebar" : "sidebar"}>

        <div id='exit-button' onClick={() => {
          console.log(1);
          setShowSidebar(0);
          setImages(null);
          setImagesUrl("");
          resetQuery();
          setInputPhase(0);
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
            <ImageLoader ImageUrl={imageUrl} />
            <form>
              <input type='file' id="image-upload" name='filename' onChange=
                {(e) => handleImage(e.target.files[0])}
              ></input>
              {showHint ? <p>Please Provide IMMAGE</p> : null}
              <button id="submit-image" type="button" onClick={(e) => {
                var status = 1;
                status = addPoints(images);
                if (status) {
                  setInputPhase(0);
                  setShowHint(0);
                } else {
                  setShowHint(1);
                  resetQuery();
                  setImages(null);
                  setImagesUrl("");
                  setInputPhase(0)
                }
                // status ? setInputPhase(0) : setShowHint(1);
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
