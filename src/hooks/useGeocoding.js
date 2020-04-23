
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

export const getPlace = (center) => {
    // This method returns a place from given center
    return getReverseGeoLocation(center[0], center[1]);

}

export const getCurrentLocation = async (updateSelectedPlace) => {
    // this method returns a center. if Current location is not available, then it returns center of default location London
    const onSuccess = async ({ coords }) => {
        // const center = [coords.longitude, coords.latitude];
        const place = await getReverseGeoLocation(coords.longitude, coords.latitude);
        console.log("from gps", place);
        updateSelectedPlace(place, 'mapbox');
    };
    
    const onError = async () => {
        // const center = [-0.1275, 51.50722];
        const place = await getGeoLocation();
        console.log("from ip", place)
        updateSelectedPlace(place, 'mapbox');
    };
    
    // get current location of user
    const geo = navigator.geolocation;
    if (!geo) {
        // code here
    }
    else {
        geo.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    }

}