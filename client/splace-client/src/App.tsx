import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MapComponent from './MapComponent.tsx';
import { Map } from 'react-map-gl';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import PointAdder from './PointAdder.tsx';
import Icon from './Icon.tsx';
import Login from './Login.tsx';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import { getLocationsByUser, LocationData, postLocation } from './APIHandler.tsx';

function App() {

  const [loginStatus, setLoginStatus] = useState(0);

  const [PointsDB, setPointsDB] = useState<LocationData[] | null >(null);

  const [userID, setUserID] = useState("");

  const [currCoord, setCurrCoord] = useState<[number, number]>([0, 0]);
  const [currDesc, setCurrDesc] = useState("");
  const [currTitle, setCurrTitle] = useState("");

  const [showSidebar, setShowSidebar] = useState(0);

  function resetQuery(){
    setCurrDesc("");
    setCurrTitle("");
  }

  function addPoints(image : File) {

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

    if(image == null){
      return 0;
    }

    postLocation(
      currTitle,
      currDesc,
      currCoord,
      image,
      userID
    );

    return 1;

  }

  async function loadLocations() {
    const data : LocationData[] | null = await getLocationsByUser(userID);
    if(!data){
      console.error("Could not fetch Location Data")
    }
    console.log(data)
    setPointsDB(data);
  }


  function getSavedPoints (): LocationData[] | null{

    if (PointsDB == null) {
      return null;
    }

    return PointsDB;

    // return PointsDB.map((point) => {
    //   // return new Feature({
    //   //   geometry: new Point(
    //   //     point.coordinates
    //   //   ),
    //   //   name: point._id
    //   // })

    //   return 
    // });
  }

  useEffect(()=>{
    if(userID == undefined){
      return
    }
    loadLocations();
  },[userID]);
  

  return (
    <>
      <div id='login-container' className={loginStatus ? "unshow-login" : "show-login"}>
        <Login setPointsDB={setPointsDB} loadLocations={loadLocations} setUserId={setUserID} setLoginStatus={setLoginStatus} />
      </div>
      <div id="map-container" className={loginStatus ? "show-map" : "unshow-map"}>
        <Icon />
        <MapComponent showSidebar={showSidebar} setShowSidebar={setShowSidebar} getSavedPoints={getSavedPoints} currCoord={currCoord} setCurrCoord={setCurrCoord} PointsDB={PointsDB} />
        <PointAdder showSidebar={showSidebar} setShowSidebar={setShowSidebar} addPoints={addPoints} setCurrDesc={setCurrDesc} currDesc={currDesc} setCurrTitle={setCurrTitle} currTitle={currTitle} resetQuery={resetQuery} />
      </div>
    </>
  );
}

export default App;
