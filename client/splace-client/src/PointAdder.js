
import './App.css';
import * as React from 'react';
import { useState } from 'react';

function PointAdder({addPoints, setCurrDesc, currDesc}) {
  return (
    <form id="point-adder">
        <div className='input-field'>
          <label>Input Description</label>
          <input value={currDesc} type='text' onChange={e => {
            setCurrDesc(e.target.value);
          }}></input>
        </div>
        <button type="button" onClick={addPoints} className='btn'>Add Location</button>
    </form>
  );
}

export default PointAdder;
