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
    var detail_id = null;
    if (mbplace.properties.wikidata) detail_id = mbplace.properties.wikidata;
    const place = {
        zoom: zoom,
        name: mbplace.text,
        center: mbplace.center,
        source: 'mapbox',
        detail_id,
        source_id: mbplace.id,
    }

    return place;
}

const osmPlaceToPlace = (osmPlace) => {
    console.log(osmPlace);
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

    var name = null;
    if (osmPlace.properties['name:en']) name = osmPlace.properties['name:en'];
    else name = osmPlace.properties.name;

    const place = {
        zoom: zoom,
        name,
        center: osmPlace.geometry.coordinates,
        source: 'osm',
        detail_id: osmPlace.properties.id,
        source_id: osmPlace.properties.id,
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

    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [placeImages, setPlaceImages] = useState([]);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const updateSelectedPlace = async (place, source) => {
        var convertedPlace;
        if (source === 'osm') {
            convertedPlace = osmPlaceToPlace(place);
        }
        if (source === 'mapbox') {
            convertedPlace = mbPlacetoPlace(place);
        }
        setSelectedPlace(convertedPlace);

        // fetch place details if source is osm
        if (convertedPlace.source === 'osm') {
            
            setIsDetailsLoading(true);
            const res = await fetch(`http://localhost:5000/api/places/details/osm?source_id=${convertedPlace.source_id}&detail_id=${convertedPlace.detail_id}`, {
                credentials: 'include'
            });
            
            const details = await res.json();
            setPlaceDetails(details);
            setIsDetailsLoading(false);
            console.log("details: " ,details);
            
            if(details.images.length > 0) {
                setPlaceImages(details.images);
                setIsImageLoading(false);
            }
            else {
                // fetch images
                setIsImageLoading(true);
                const imgres = await fetch(`http://localhost:5000/api/places/images?detail_id=${details._id}`, {
                    credentials: 'include'
                });
                const imgresult = await imgres.json();
                setPlaceImages(imgresult);
                setIsImageLoading(false);
                
            }
        }

        // fetch place details if source is mapbox
        if (convertedPlace.source === 'mapbox') {

            const place = JSON.stringify(convertedPlace);

            setIsDetailsLoading(true);
            const res = await fetch(`http://localhost:5000/api/places/details/mapbox?source_id=${convertedPlace.source_id}&detail_id=${convertedPlace.detail_id}&convertedPlace=${place}`, {
                credentials: 'include'
            });
            
            const details = await res.json();
            setPlaceDetails(details);
            setIsDetailsLoading(false);
            console.log("details: " ,details);
            
            if(details.images.length > 0) {
                setPlaceImages(details.images);
                setIsImageLoading(false);
            }
            else {
                // fetch images
                setIsImageLoading(true);
                const imgres = await fetch(`http://localhost:5000/api/places/images?detail_id=${details._id}`, {
                    credentials: 'include'
                });
                const imgresult = await imgres.json();
                setPlaceImages(imgresult);
                setIsImageLoading(false);
            }

        }

    }    


    return (
        <MapContext.Provider value={{ selectedPlace, updateSelectedPlace, isDetailsLoading, placeDetails, placeImages, isImageLoading }}>
            {children}
        </MapContext.Provider>
    );
}