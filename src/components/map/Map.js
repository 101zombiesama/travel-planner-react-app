import React, { useState } from 'react';
import ReactMapGL from "react-map-gl"



export default function Map() {
    const [viewport, setViewport] = useState({
      latitude: 43.296482,
      longitude: 5.369780,
      width: '100%',
      height: '500px',
      zoom: 14
    });
  
    return (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={'pk.eyJ1IjoiMTAxem9tYmllc2FtYSIsImEiOiJjazczdTFpNWkwMXB0M3JwYXJ0dWlocG5oIn0.DBYFkouXmtUS1eKSjF5L-w'}
          mapStyle = "mapbox://styles/101zombiesama/cjzstgojq0bz51cmqayhod047"
          onViewportChange = {setViewport}
        >
  
        </ReactMapGL>
    );
  }
