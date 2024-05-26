import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import { Map } from 'react-map-gl';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import PointAdder from './PointAdder';
import Icon from './Icon';
import Login from './Login';
import { getLocationsByUser } from './APIHandler';


function App() {

  const [loginStatus, setLoginStatus] = useState(0);

  const [PointsDB, setPointsDB] = useState([]);

  const [userID, setUserID] = useState("");

  const [currCoord, setCurrCoord] = useState([0, 0]);
  const [currDesc, setCurrDesc] = useState("");
  const [currTitle, setCurrTitle] = useState("");

  const [showSidebar, setShowSidebar] = useState(0);

  function addPoints(desc) {

    // setPointsDB(
    //   [...PointsDB,
    //   {
    //     coordinate: currCoord,
    //     title: currTitle,
    //     desc: currDesc,
    //     id: crypto.randomUUID()
    //   }
    //   ]
    // );
    // setCurrCoord([0, 0]);
    // setCurrDesc("");
    // setCurrTitle("");
  }

  async function loadLocations() {
    const data = await getLocationsByUser(userID);
    setPointsDB(data);
    console.log(data);
  }


  function getSavedPoints() {

    if (!PointsDB) {
      return
    }

    return PointsDB.map((point) => {
      return new Feature({
        geometry: new Point(
          point.coordinates
        ),
        name: point._id
      })
    });
  }

  useEffect(()=>{
    loadLocations();
  },[loginStatus]);
  

  return (
    <>
      <div id='login-container' className={loginStatus ? "unshow-login" : "show-login"}>
        <Login setPointsDB={setPointsDB} loadLocations={loadLocations} setUserId={setUserID} setLoginStatus={setLoginStatus} />
      </div>
      <div id="map-container" className={loginStatus ? "show-map" : "unshow-map"}>
        <Icon />
        <MapComponent showSidebar={showSidebar} setShowSidebar={setShowSidebar} getSavedPoints={getSavedPoints} currCoord={currCoord} setCurrCoord={setCurrCoord} PointsDB={PointsDB} />
        <PointAdder showSidebar={showSidebar} setShowSidebar={setShowSidebar} addPoints={addPoints} setCurrDesc={setCurrDesc} currDesc={currDesc} setCurrTitle={setCurrTitle} currTitle={currTitle} />
      </div>
    </>
  );
}

export default App;
