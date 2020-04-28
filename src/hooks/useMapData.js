// this hook is responsible for handling the tourist places, places of interests using the OpenTripMap API
import mapboxgl from 'mapbox-gl';

const url = "https://api.opentripmap.com/0.1/en/places/";
const limit = 10000;
const buffer_in_m = 20000;
const createBuffer = (buffer_in_m) => {
    return(
        (buffer_in_m/6378100)*57.295
    );
}


// private handlers
const isKind = (kinds, kind) => {
    const arr = kinds.split(',');
    return arr.includes(kind);
}

const getOSMLabels = async (map) => {

    const buffer = createBuffer(buffer_in_m);
    // const buffer = 0;
    const bounds = map.getBounds();
    const lon_min = bounds._sw.lng - buffer;
    const lon_max = bounds._ne.lng + buffer;
    const lat_min = bounds._sw.lat - buffer;
    const lat_max = bounds._ne.lat + buffer;

    const body = `[out:json];node[wikidata](${lat_min},${lon_min},${lat_max},${lon_max});out;`;
    const res = await fetch(`http://localhost:5000/api/places/osmdata?data=${body}`, { credentials: 'include' });
    const result = await res.json();
    return  result

}

const getOTMLabels = async (map) => {
    // returns geoJson data in the map's geographical bounds

    const buffer = createBuffer(buffer_in_m);
    // const buffer = 0;
    const bounds = map.getBounds();
    const lon_min = bounds._sw.lng - buffer;
    const lon_max = bounds._ne.lng + buffer;
    const lat_min = bounds._sw.lat - buffer;
    const lat_max = bounds._ne.lat + buffer;

    // defining the rate based on map zoom
    const zoom = map.getZoom();
    var rate;
    switch (zoom) {
        case 10:
            rate = '2h'
            break;
        case 11:
            rate = '3'
            break;
        case 12:
            rate = '2'
            break;
        case 13:
            rate = '1'
            break;
    
        default:
            rate = '3h'
            break;
    }

    if (zoom > 13) rate = '1';
    if (zoom < 10) rate = '2h';

    const res = await fetch(`${url}bbox?lon_min=${lon_min}&lon_max=${lon_max}&lat_min=${lat_min}&lat_max=${lat_max}&rate=${rate}&limit=${limit}&apikey=${process.env.REACT_APP_OTM_APIKEY}`);
    const result = await res.json();
    console.log("use lables is getting called", result);
    return result;
}

export const addCustomMarker = (map, center, markerName) => {
    // clear previous custom markers
    var markers = document.getElementsByClassName('red-marker');
    if (markers.length > 0) markers[0].remove();
    var el = document.createElement('div');
    el.className = markerName;

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(center)
        .setOffset([0, -20])
        .addTo(map);
}

export const addDynamicLabels = async (map) => {
    // intialize the data for poi labels
    var data = await getOSMLabels(map);
    // add the source and labels layer
    map.addSource('osmPoiData', { type: 'geojson', data: data });
    map.addLayer({
        'id': 'osm-poi',
        'type': 'symbol',
        'source': 'osmPoiData',
        'layout': {
            'icon-image': 'rocket-15'
        }
    });
    // populate with new markers everytime map moves
    map.on('moveend', async () => {
        data = await getOSMLabels(map);
        map.getSource('osmPoiData').setData(data);
    });
    map.on('mouseenter', 'osm-poi', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'osm-poi', () => {
        map.getCanvas().style.cursor = '';
    });
}

export const addVectorTiles = (map) => {
    // adds the vector tiles from OTM in different layers to map according to the poi type.
    

    map.addSource(`otm.labels`, {
        type: "vector",
        bounds: [-180, -85.0511, 180, 85.0511],
        minzoom: 8,
        maxzoom: 14,
        scheme: "xyz",
        tiles: [
            `https://api.opentripmap.com/0.1/en/tiles/pois/{z}/{x}/{y}.pbf?apikey=` + process.env.REACT_APP_OTM_APIKEY
        ]
    });

    // map.loadImage('../assets/img/maki/marker-15.svg', (err, img) => {
    //     if (err) throw err;
    //     map.addImage('marker-15', img);
    // })

    map.addLayer({
        'id': 'otm-labels',
        'type': 'symbol',
        'source': 'otm.labels',
        'minzoom': 16,
        'source-layer': 'pois',
        'layout': {
            'icon-image': 'marker-15',
            // 'text-field': ['get', 'name'],
            'text-size': 8,
            'text-max-width': 8,
            'text-anchor': 'top',
            'text-offset': [0,1]
        }
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'otm-labels', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features[0].properties.name.length > 0){
            popup
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML("<strong>" + e.features[0].properties.name + "</strong>")
                .addTo(map);
        }
        
    });
    map.on('mouseleave', 'otm-labels', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
        
    });
    map.on('click', 'otm-labels', (e) => {
        console.log(e.features[0]);
    })


}