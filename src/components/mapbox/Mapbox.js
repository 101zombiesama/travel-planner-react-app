import React, { useState, useEffect, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import mapboxgl from 'mapbox-gl';
import { MapContext } from '../../contexts/MapContext';
import { getPlace, getCurrentLocation } from '../../hooks/useGeocoding';
import { addCustomMarker ,addDynamicLabels, addVectorTiles } from '../../hooks/useMapData';
import './mapbox.css';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;



export default function Mapbox() {
    var mapContainer;

    // contexts
    const { selectedPlace, updateSelectedPlace } = useContext(MapContext);

    // private states
    const [map, setMap] = useState(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: selectedPlace.center,
            zoom: selectedPlace.zoom,
            
            });

        map.on('load', async function () {
            getCurrentLocation(updateSelectedPlace);
            setMap(map);

            // add navigation control
            map.addControl(new mapboxgl.NavigationControl())
    
            // Insert the layer beneath any symbol layer.
            var layers = map.getStyle().layers;

            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
            // adding 3d layer
            map.addLayer({
                    'id': '3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                      
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 14,
                    'paint': {
                        'fill-extrusion-color': '#e8e8e8',

                        // use an 'interpolate' expression to add a smooth transition effect to the
                        // buildings as the user zooms in
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.75
                    },
                    "light": {
                        "anchor": "map",
                        "color": "white",
                        "intensity": 0.5
                      }
                      
                },
                labelLayerId
            );
            // add dynamic labels from other sources (currently using osm data source)
            addDynamicLabels(map);
            
        });

        map.on('click', 'poi-label', async function(e) {
            const place = await getPlace(e.features[0].geometry.coordinates);
            updateSelectedPlace(place, 'mapbox');
            // addCustomMarker(map, place.center, 'red-marker');

        });
        map.on('click', 'osm-poi', async function(e) {
            const place = e.features[0]
            updateSelectedPlace(place, 'osm');
            // addCustomMarker(map, place.geometry.coordinates, 'red-marker');
            
        });

        // // Change the cursor to a pointer when the it enters the map
        map.on('mouseenter', 'poi-label', function() {
            map.getCanvas().style.cursor = 'pointer';
        });
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'poi-label', function() {
            map.getCanvas().style.cursor = '';
        });

    }, []);

    // use effect for flying to a location. mapCenter is retrieved from context and can be changed from other components
    useEffect(() => {
        console.log(selectedPlace);
        if (map) {
            map.flyTo({
                center: selectedPlace.center,
                zoom: selectedPlace.zoom,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
            addCustomMarker(map, selectedPlace.center, 'red-marker');
        }
    }, [selectedPlace]);

    return (
        <Fade>
        <div className='maproot'>
            <div ref={el => mapContainer = el} className='mapContainer' />
        </div>
        </Fade>
        );

}