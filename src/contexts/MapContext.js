import React, { createContext, useState } from 'react';
import usePosition from '../hooks/usePosition';

export const MapContext = createContext();

// helper functions


export default function MapContextProvider({ children }) {

    // const place = usePosition();

    // states
    const [selectedPlace, setSelectedPlace] = useState({
        text: "London",
        place_name: "London, Greater London, England, United Kingdom",
        center: [-0.1275, 51.50722],
    });
    
    const [mapCenter, setMapCenter] = useState({
        lng: selectedPlace.center[0],
        lat: selectedPlace.center[1],
        zoom: 12,
        place_text: selectedPlace.text,
        place_name: selectedPlace.place_name,
    });

    // private handlers
    const updateSelectedPlace = (place) => {
        setSelectedPlace(place);
        var zoom = 14;
        switch (place.place_type[0]) {
            case "district":
                zoom = 10;
                break
            case "place":
                zoom = 12;
                break
            case "poi":
                zoom = 16;
                break
            case "locality":
                zoom = 14;
                break
        
            default:
                zoom = 10;
                break;
        }
        setMapCenter({...Object.assign(mapCenter, { lng: place.center[0], lat: place.center[1], zoom: zoom, place_text: place.text, place_name: place.place_name })});
    }

    // HANDLE THIS LATER. CORS PROBLEM!!!!!

    // const getGeoLocation = async () => {
    //     const res = await fetch('http://worldtimeapi.org/api/ip');
    //     const result = await res.json();
    //     const city = result.timezone.split('/')[1];
    //     const searchRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    //     const searchResult = await searchRes.json();
    //     const place = searchResult.features[0];
    //     return place;
    // }
    
    // const getReverseGeoLocation = async (lng, lat) => {
    
    //     const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    //     const result = await res.json();
    //     const place = result.features[0];
    //     return place;
    // }

    // const onSuccess = async ({ coords }) => {
    //     const place = await getReverseGeoLocation(coords.longitude, coords.latitude);
    //     updateSelectedPlace(place);
    // };
    
    // const onError = async () => {
    //     const place = await getGeoLocation();
    //     updateSelectedPlace(place);
    // };

    // // get current location of user
    // const geo = navigator.geolocation;
    // if (!geo) {
    //     // code here
    // }
    // else {
    //     geo.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    // }
    


    return (
        <MapContext.Provider value={{ mapCenter, selectedPlace, updateSelectedPlace }}>
            {children}
        </MapContext.Provider>
    );
}