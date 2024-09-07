import React, { useState } from 'react';
import { Map, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibmltMmRldiIsImEiOiJjbTBzYmJwODUwaXVhMmpzaDQ0MWs2dWRwIn0.SSs14OfY72D_6fKKY5NGyg'; // Replace with your Mapbox token

const MapWithWebGLImageOverlay = () => {
  // Define the images with names and coordinates
  const images = [
    {
      name: 'Charizard',
      url: 'https://images.pokemontcg.io/base1/4.png',
      coordinates: [
        [34.766849, 32.099136],
        [34.774220, 32.099136],
        [34.774220, 32.091004],
        [34.766849, 32.091004]
      ]
    },
    {
      name: 'Pikachu',
      url: 'https://m.media-amazon.com/images/I/51TIbI-assL._AC_UF894,1000_QL80_.jpg',
      coordinates: [
        [34.774220, 32.080004],
        [34.781591, 32.080004],
        [34.781591, 32.072872],
        [34.774220, 32.072872]
      ]
    },
    {
      name: 'Bulbasaur',
      url: 'https://images.pokemontcg.io/base1/44.png',
      coordinates: [
        [34.774220, 32.085004],
        [34.781591, 32.085004],
        [34.781591, 32.077872],
        [34.774220, 32.077872]
      ]
    },
    {
      name: 'Squirtle',
      url: 'https://images.pokemontcg.io/base1/63.png',
      coordinates: [
        [34.784500, 32.070000],
        [34.790871, 32.070000],
        [34.790871, 32.062868],
        [34.784500, 32.062868]
      ]
    }
  ];

  // State for map view
  const [viewState, setViewState] = useState({
    longitude: 34.7702,
    latitude: 32.0953,
    zoom: 13
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Handle search and focus on the desired image
  const handleSearch = (name) => {
    const foundImage = images.find((image) => image.name.toLowerCase() === name.toLowerCase());
    if (foundImage) {
      console.log('foundImage: ', foundImage);
      // Set the view to focus on the searched image
      setViewState({
        ...viewState, // Preserve existing view state values
        longitude: (foundImage.coordinates[0][0] + foundImage.coordinates[1][0]) / 2,
        latitude: (foundImage.coordinates[0][1] + foundImage.coordinates[2][1]) / 2,
        zoom: 13
      });
    } else {
      alert('Image not found');
    }
  };

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = images
        .filter((image) =>
          image.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .map((image) => image.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="map-container">
      {/* Search bar for finding images by name */}
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Try: Pikachu / Squirtle"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={() => handleSearch(searchTerm)}>Search</button>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul className='ulSearch'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{ cursor: 'pointer', padding: '1px 1px' }}
                onClick={() => {
                  setSearchTerm(suggestion);
                  handleSearch(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map component */}
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        viewState={viewState} // Use viewState to control the map's current state
        onMove={(evt) => setViewState(evt.viewState)} // Update view state on map move
        style={{ width: '100%', height: '500px' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* Loop through each image and add it to the map */}
        {images.map((image, index) => (
          <Source
            key={index}
            id={`image-source-${index}`}
            type="image"
            url={image.url}
            coordinates={image.coordinates}
          />
        ))}

        {images.map((image, index) => (
          <Layer
            key={index}
            id={`image-layer-${index}`}
            type="raster"
            source={`image-source-${index}`}
            paint={{ 'raster-opacity': 0.8 }}
          />
        ))}
      </Map>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <MapWithWebGLImageOverlay />
    </div>
  );
}

export default App;
