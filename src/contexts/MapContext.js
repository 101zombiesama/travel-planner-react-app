import React, { createContext, useState } from 'react';

export const MapContext = createContext();

// helper functions
const mbPlacetoPlace = (mbplace) => {
    console.log(mbplace);
    var zoom;
    switch (mbplace.place_type[0]) {
        case "district":
            zoom = 11;
            break
        case "place":
            zoom = 13;
            break
        case "address":
            zoom = 14;
            break
        case "locality":
            zoom = 15;
            break
        case "poi":
            zoom = 16;
            break
        default:
            zoom = 13;
            break;
    }
    const place = {
        zoom: zoom,
        name: mbplace.text,
        center: mbplace.center,
        source: 'mapbox',
        detail_id: mbplace.properties.wikidata || null,
        source_id: mbplace.id || null,
    }

    return place;
}

const osmPlaceToPlace = (osmPlace) => {
    var zoom;
    const type = osmPlace.properties.id.split('/')[0];
    switch (type) {
        case 'node':
            zoom = 16
            break;
        case 'way':
            zoom = 15
            break;
    
        default:
            zoom = 15
            break;
    }

    const place = {
        zoom: zoom,
        name: osmPlace.properties.name,
        center: osmPlace.geometry.coordinates,
        source: 'osm',
        detail_id: osmPlace.properties.id || null,
        source_id: osmPlace.properties.id || null,
    }

    return place;

}

export default function MapContextProvider({ children }) {

    const [selectedPlace, setSelectedPlace] = useState({
        // IMP!! source value defines how the details are fetched. if 'mapbox', detailsId = wikidata id will be fetched from mapbox place if exists
        // if 'osm', detaislId = osmId will be fetched from the osm place and the detials can be fetched from this id using api
        // if 'database', detailsId = placeDetailsId can be fetched from the server, from the database and details can be obtained.
        // If in future, new sources need to be added, their respective id's for fetching details will be assigned to detailsId along with its source name
        zoom: 12,
        name: "London",
        center: [-0.1275, 51.50722], //[lon, lat]
        source: 'mapbox', //'mapbox', 'osm', 'database'. detials fetching method will be determined from this source value
        detail_id: null,
        source_id: null
    });

    // private handlers
    const updateSelectedPlace = (place, source) => {
        var convertedPlace;
        if (source === 'osm') {
            convertedPlace = osmPlaceToPlace(place);
        }
        if (source === 'mapbox') {
            convertedPlace = mbPlacetoPlace(place);
        }
        // setSelectedPlace(prevPlace => Object.assign(prevPlace, convertedPlace));
        setSelectedPlace(convertedPlace);
    }
    


    return (
        <MapContext.Provider value={{ selectedPlace, updateSelectedPlace }}>
            {children}
        </MapContext.Provider>
    );
}