// MapComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector.js';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector.js';
import layer from 'ol/layer/Layer.js';
import * as source from 'ol/source';
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Style from 'ol/style/Style'
import * as proj from 'ol/proj';
import Icon from 'ol/style/Icon.js';
import 'ol/ol.css';
import * as olCoordinate from 'ol/coordinate';

export default function MapComponent({ getSavedPoints, setCurrCoord, PointsDB}) {

    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })

        const map = new Map({
            target: "map",
            layers: [osmLayer],
            view: new View({
                center: [12706762, 2554414],
                zoom: 11.5,
                maxZoom: 19,
                extent: [12650145.166640699, 2523450.4166796366, 12762053.88243911, 2586813.9495912604]
            }),
        });

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


        //adding marker on click
        map.on('click', (e) => {
            const clickedCoordinate = e.coordinate;
            setCurrCoord(clickedCoordinate);
        });

        // map.on('moveend', function (e) {
        //     var newZoom = map.getView().getZoom();
        //     var newExtent = map.getView().getViewStateAndExtent().extent;
        //     console.log(`Zoom: ${newZoom}\nNew extent: ${newExtent}`);
        // });

        return () => map.setTarget(null)
    }, [PointsDB]);

    return (
        <div style={{ height: '300px', width: '100%' }} id="map" className="map-container" />
    );
}