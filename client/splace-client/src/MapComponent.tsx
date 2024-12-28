// MapComponent.js
import React, { useState, useEffect, createRef, useRef, useCallback } from 'react';
// import { findDOMNode } from "react-dom";
// import { Map, View } from 'ol';
// import Overlay from 'ol/Overlay.js';
// import VectorLayer from 'ol/layer/Vector.js';
// import OSM from 'ol/source/OSM';
// import VectorSource from 'ol/source/Vector.js';
// import { Feature } from 'ol';
// import { Point } from 'ol/geom';
// import Style from 'ol/style/Style'
// import Icon from 'ol/style/Icon.js';
import L, { LeafletMouseEvent } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import MapEventsHandler from './MapEventsHandler.tsx';
import 'ol/ol.css';
import { LocationData } from './APIHandler';


export default function MapComponent({ showSidebar, setShowSidebar, PointsDB, currCoord, setCurrCoord }) {

    // 1. Show the current coordinate as latlng
    // 2. Set the map center
    // 3. Add onclick event to set the current coordinate and show the sidebar
    // 4. Add markers to the map

    const mapOptions = {
        center: [22.300532082873683, 114.14382934570314] as [number, number],
        zoom: 11.5,
        maxZoom: 19,
        minZoom: 5,
    };

    const handleMapClick = (e: LeafletMouseEvent) => {
        console.log(e.latlng);
        setCurrCoord([e.latlng.lat, e.latlng.lng]);
        setShowSidebar(1);
    }

    return (
        <>
            <MapContainer id="map" {...mapOptions}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEventsHandler handleMapClick={handleMapClick} />
                {PointsDB ? PointsDB.map((element: LocationData) => (
                    <Marker key={element._id} position={element.coordinates}>
                        <Popup>
                            {element.description}
                        </Popup>
                    </Marker>

                )) : null}

                {/* Marker for current position */}
                <Marker position={currCoord}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );

    /*
    const [selectedMarkerCorrd, setSelectedMarkerCorrd] = useState<[number]>();

    

    function getTitleByID(id) {
        console.log(id);
        for (var i = 0; i < PointsDB.length; i++) {

            if (PointsDB[i].id == id) {
                return PointsDB[i].title;
            }
        }
        return "What";
    }

    useEffect(() => {
        console.log("Points DB changed:");
        const points = getSavedPoints();


        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })


        //create base map object
        const map = new Map({
            target: "map",
            layers: [osmLayer],
            view: new View({
                center: [12706762, 2554414],
                zoom: 11.5,
                maxZoom: 19,
                extent: [12650145.166640699, 2523450.4166796366, 12762053.88243911, 2586813.9495912604]
            }),
            controls: []

        });

        //create layer for marker 
        const marker_layer = new VectorLayer({
            source: new VectorSource({
                features: points
            }),

            style: new Style({
                image: new Icon({
                    src: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
                    anchor: [.5, 1],
                    scale: .1
                })
            }),
        });

        // Basic overlay

        if(findDOMNode(this).){

        }

        const overlay = new Overlay({
            position: selectedMarkerCorrd,
            element: document.getElementById('#overlay'),
            positioning: 'center-center',
            stopEvent: false
        });


        map.addLayer(marker_layer);


        //setting current coordinate on click
        map.on('click', (e) => {
            const clickedCoordinate = e.coordinate;

            setShowSidebar(1);
            setCurrCoord(clickedCoordinate);
            // var extent = [clickedCoordinate[0] - 1000, clickedCoordinate[1] - 1000, clickedCoordinate[0] + 1000, clickedCoordinate[1] + 1000]

            // map.getView().fit(extent);

        });

        map.on('moveend', function (e) {
            var newZoom = map.getView().getZoom();
            var newExtent = map.getView().getViewStateAndExtent().extent;
            console.log(`Zoom: ${newZoom}\nNew extent: ${newExtent[3] - newExtent[1]}`);
        });

        return () => map.setTarget(undefined)
    }, [PointsDB]);

    return (
        <>
            <div style={{ height: '300px', width: '100%' }} id="map" className={showSidebar ? "map-container show-sidebar" : "map-container"} />
        </>
    );
    */
}