// MapComponent.js
import React, { useState, useEffect, createRef, useRef } from 'react';
import { findDOMNode } from "react-dom";
import { Map, View } from 'ol';
import Overlay from 'ol/Overlay.js';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector.js';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector.js';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon.js';
import 'ol/ol.css';

export default function MapComponent({ showSidebar, setShowSidebar, getSavedPoints, currCoord, setCurrCoord, PointsDB }) {

    const popup = createRef();

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

        const selected_marker_layer = new VectorLayer({
            source: new VectorSource({
                features: [new Feature({
                    geometry: new Point(
                        currCoord
                    )
                })]
            }),

            style: new Style({
                image: new Icon({
                    src: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
                    anchor: [.5, 1],
                    scale: .1
                })
            })

        });


        //create layer for marker 
        const marker_layer = new VectorLayer({
            source: new VectorSource({
                features: getSavedPoints()
            }),

            style: new Style({
                image: new Icon({
                    src: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
                    anchor: [.5, 1],
                    scale: .1
                })
            })

        });

        map.addLayer(marker_layer);

        // create overlay for popup
        const container = popup.current;

        const overlay = new Overlay({
            element: container,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });

        map.addOverlay(overlay);

        let popover;
        function disposePopover() {
            if (popover) {
                popover.dispose();
                popover = undefined;
            }
        }

        //adding marker on click
        map.on('click', (e) => {
            const clickedCoordinate = e.coordinate;

            const feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
                return feature;
            });

            disposePopover();
            if (feature) {
                overlay.setPosition(clickedCoordinate);
                console.log(popup.current)
                popup.current.childNodes[0].innerHTML = getTitleByID(feature.get('name'));
                return;
            }

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

        return () => map.setTarget(null)
    }, [PointsDB]);

    return (
        <>
            <div style={{ height: '300px', width: '100%' }} id="map" className={showSidebar ? "map-container show-sidebar" : "map-container"} />
            <div id="popup" className="ol-popup" ref={popup}>
                <h1>123</h1>
                <img></img>
            </div>
        </>
    );
}