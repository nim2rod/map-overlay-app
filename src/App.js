import React from 'react';
import { Map, Layer, Source } from 'react-map-gl'; // Updated import
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace this with your actual Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmltMmRldiIsImEiOiJjbTBzYmJwODUwaXVhMmpzaDQ0MWs2dWRwIn0.SSs14OfY72D_6fKKY5NGyg'; // <-- Put your Mapbox token here

const MapWithWebGLImageOverlay = () => {
  // Define the image URL and its geographic coordinates
  const imageUrl = 'https://m.media-amazon.com/images/I/51TIbI-assL._AC_UF894,1000_QL80_.jpg'; // Make sure this is a valid image URL
  const coordinates = [
    [34.766849, 32.099136], // Top-left corner (longitude, latitude)
    [34.774220, 32.099136], // Top-right corner (longitude, latitude)
    [34.774220, 32.091004], // Bottom-right corner (longitude, latitude)
    [34.766849, 32.091004]  // Bottom-left corner (longitude, latitude)
  ];


  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN} // Updated prop name
      initialViewState={{
        longitude: 34.7702,
        latitude: 32.0953,
        zoom: 13
      }}
      style={{ width: '100%', height: '500px' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {/* Adding the image as a custom layer */}
      <Source id="image-source" type="image" url={imageUrl} coordinates={coordinates} />
      <Layer
        id="image-layer"
        type="raster"
        source="image-source"
        paint={{ 'raster-opacity': 0.8 }}
      />
    </Map>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Map with Image Overlay</h1>
      <MapWithWebGLImageOverlay />
    </div>
  );
}

export default App;
