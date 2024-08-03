import {  Map, Feature } from "ol";
import View from 'ol/View';
import { useEffect, useRef } from "react";
import React from "react";
import greenMarker from '../assets/images/marker-green.png';
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import 'ol/ol.css';
import MultiPoint from 'ol/geom/MultiPoint.js';


function MapComponent({stores, centralPoint }) {
    const mapElement = useRef();
    const mapRef = useRef();

    useEffect(() => {

        if(stores != undefined){
            mapRef.current.getView().setCenter(centralPoint);
            
            const iconFeature = new Feature({
                geometry: new MultiPoint(stores.map(store => store.transformedcoordinates)),
            });
            
            iconFeature.setStyle(
                new Style({
                    image: new Icon({
                        anchor: [0.5, 1],
                        src: greenMarker,
                    }),
                })
            );
            const markerVectorSource = new VectorSource({features: [iconFeature]})
         
            mapRef?.current?.getAllLayers().forEach(layer => {
                if(layer instanceof VectorLayer) {
                    mapRef?.current?.removeLayer(layer);
                }
                
            });
            mapRef.current.addLayer(new VectorLayer({source: markerVectorSource}))
        }
       
    }, [stores]) 
    


    useEffect(() => {
        if (mapElement.current && !mapRef.current) {
            mapRef.current = new Map({
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                target: mapElement.current,
                view: new View({
                    center: [0, 0],
                    zoom: 6,
                }),
            });
        }
    }, [mapElement, mapRef]);

    return <div ref={mapElement} className="w-full max-w-[700px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]" /* style={{ minWidth: "50vw", minHeight: "500px" }} */ />;
}

export default MapComponent;