import React, { useState, useEffect, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import mapboxgl from 'mapbox-gl';
import { MapContext } from '../../contexts/MapContext';
import './mapbox.css'


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Mapbox() {
    var mapContainer;

    // contexts
    const { mapCenter } = useContext(MapContext);

    // private states
    const [map, setMap] = useState(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [mapCenter.lng, mapCenter.lat],
            zoom: mapCenter.zoom,
            
            });

        map.on('load', function () {
            setMap(map);
            // add navigation control
            map.addControl(new mapboxgl.NavigationControl());

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
                        'fill-extrusion-color': '#aaa',

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
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        });

    }, []);

    // use effect for flying to a location. mapCenter is retrieved from context and can be changed from other components
    useEffect(() => {
        if (map) {
            map.flyTo({
                center: [ mapCenter.lng, mapCenter.lat ],
                zoom: mapCenter.zoom,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
        }
    }, [mapCenter]);

    return (
        <Fade>
        <div className='maproot'>
            <div ref={el => mapContainer = el} className='mapContainer' />
        </div>
        </Fade>
        );

}