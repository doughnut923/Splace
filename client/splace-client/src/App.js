import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { useState } from 'react';
import MapComponent from './MapComponent';
import { Map } from 'react-map-gl';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import PointAdder from './PointAdder';
import Icon from './Icon';

function App() {

  const [PointsDB, setPointsDB] = useState([
    {
      coordinate: [12705901.065789457, 2555400.672681684],
      desc: "My first Point"
    },
    {
      coordinate: [12728949.172394536, 2559062.2261289414],
      desc: "My second Point"
    }
  ]);

  const [currCoord, setCurrCoord] = useState([0, 0]);
  const [currDesc, setCurrDesc] = useState("");
  const [currTitle, setCurrTitle] = useState("");


  function addPoints(desc) {

    setPointsDB(
      [...PointsDB,
      {
        coordinate: currCoord,
        desc: currDesc
      }
      ]
    );
  }

  function getSavedPoints() {

    return PointsDB.map((point) => {
      return new Feature({
        geometry: new Point(
          point.coordinate
        )
      })
    });

  }


  return (
    <>
      <div id="map-container">
        <Icon/>
        <MapComponent getSavedPoints={getSavedPoints} setCurrCoord={setCurrCoord} PointsDB={PointsDB} />
        <PointAdder className="sidebar" addPoints={addPoints} setCurrDesc={setCurrDesc} currDesc={currDesc} setCurrTitle={setCurrTitle} currTitle={currTitle}/>
      </div>
    </>
  );
}

export default App;
