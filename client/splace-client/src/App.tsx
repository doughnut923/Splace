import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MapComponent from './MapComponent.tsx';
import PointAdder from './PointAdder.tsx';
import Icon from './Icon.tsx';
import Login from './Login.tsx';
import "leaflet/dist/leaflet.css";
import { getLocationsByUser, LocationData, postLocation } from './APIHandler.tsx';

function App() {

  const [loginStatus, setLoginStatus] = useState(0);

  const [PointsDB, setPointsDB] = useState<LocationData[] | null >(null);

  const [userID, setUserID] = useState("");

  const [currCoord, setCurrCoord] = useState<[number, number]>([0, 0]);
  const [currDesc, setCurrDesc] = useState("");
  const [currTitle, setCurrTitle] = useState("");

  const [showSidebar, setShowSidebar] = useState(0);

  const [showLoginFailed, setShowLoginFailed] = useState(0);

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
      <div id='login-failed' className={showLoginFailed ? "show-login-failed" : "unshow-login-failed"}>
        <span>登入失敗</span>
        <svg onClick={() => setShowLoginFailed(0)} className="close" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </div>
      <div id='login-container' className={loginStatus ? "unshow-login" : "show-login"}>
        <img src="./logo_trans.svg" alt="" className='logo'/>
        <Login setPointsDB={setPointsDB} loadLocations={loadLocations} setUserId={setUserID} setLoginStatus={setLoginStatus} setShowLoginFailed={setShowLoginFailed}/>
      </div>
      <div id="map-container" className={loginStatus ? "show-map" : "unshow-map"}>
        <Icon/>
        <MapComponent showSidebar={showSidebar} setShowSidebar={setShowSidebar} PointsDB={PointsDB} currCoord={currCoord} setCurrCoord={setCurrCoord} />
        <PointAdder showSidebar={showSidebar} setShowSidebar={setShowSidebar} addPoints={addPoints} setCurrDesc={setCurrDesc} currDesc={currDesc} setCurrTitle={setCurrTitle} currTitle={currTitle} resetQuery={resetQuery} />
      </div>
    </>
  );
}

export default App;
