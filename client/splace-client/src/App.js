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
import Login from './Login';


function App() {

  const [loginStatus, setLoginStatus] = useState(0);

  console.log(loginStatus);

  const [PointsDB, setPointsDB] = useState([
    {
      coordinate: [12705901.065789457, 2555400.672681684],
      title: "Title", 
      desc: "My first Point",
      id: crypto.randomUUID()
    },
    {
      coordinate: [12728949.172394536, 2559062.2261289414],
      title: "Title", 
      desc: "My second Point",
      id: crypto.randomUUID()
    }
  ]);

  const [users, setUser] = useState([
    {
      name: "Hon",
      password: "123"
    },{
      name: "Jon",
      password: "321"
    }
  ]);

  const [currCoord, setCurrCoord] = useState([0, 0]);
  const [currDesc, setCurrDesc] = useState("");
  const [currTitle, setCurrTitle] = useState("");

  const [showSidebar, setShowSidebar] = useState(0);

  function addPoints(desc) {

    setPointsDB(
      [...PointsDB,
      {
        coordinate: currCoord,
        title: currTitle,
        desc: currDesc,
        id: crypto.randomUUID()
      }
      ]
    );
    setCurrCoord([0,0]);
    setCurrDesc("");
    setCurrTitle("");
  }

  function getSavedPoints() {

    return PointsDB.map((point) => {
      return new Feature({
        geometry: new Point(
          point.coordinate
        ),
        name: point.id
      })
    });
  }


  return (
    <>
      <div id='login-container' className={loginStatus?"unshow-login":"show-login"}>
        <Login users={users} setLoginStatus={setLoginStatus}/>
      </div>
      <div id="map-container" className={loginStatus?"show-map":"unshow-map"}>
        <Icon/>
        <MapComponent showSidebar={showSidebar} setShowSidebar = {setShowSidebar} getSavedPoints={getSavedPoints} currCoord = {currCoord} setCurrCoord={setCurrCoord} PointsDB={PointsDB} />
        <PointAdder showSidebar={showSidebar} setShowSidebar = {setShowSidebar}  addPoints={addPoints} setCurrDesc={setCurrDesc} currDesc={currDesc} setCurrTitle={setCurrTitle} currTitle={currTitle}/>
      </div>
    </>
  );
}

export default App;
