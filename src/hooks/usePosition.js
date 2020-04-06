import {useState, useEffect} from 'react';

const getGeoLocation = async () => {
    const res = await fetch('http://worldtimeapi.org/api/ip');
    const result = await res.json();
    const city = result.timezone.split('/')[1];
    const searchRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    const searchResult = await searchRes.json();
    const place = searchResult.features[0];
    return place;
}

const getReverseGeoLocation = async (lng, lat) => {

    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    const result = await res.json();
    const place = result.features[0];
    return place;
}

const usePosition = () => {
    // const [position, setPosition] = useState({});
    // const [error, setError] = useState(null);


    const onSuccess = async ({ coords }) => {
        const place = await getReverseGeoLocation(coords.longitude, coords.latitude);
        return place;
    };

    const onError = async () => {
        const place = await getGeoLocation();
        return place;
    };

    useEffect( () => {
        async function getPosition(){
            const geo = navigator.geolocation;
            if (!geo) {
                const place = await onError();
                return place;
            }

            geo.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
        }

        getPosition();

    }, []);

}

export default usePosition;