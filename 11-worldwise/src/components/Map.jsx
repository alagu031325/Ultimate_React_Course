/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  //useNavigate hook provided by react router - returns a function called navigate which we can then use to move to any URL

  //Global state
  const { cities } = useCities();

  //center prop requires array of lat and lng positions
  const [mapPosition, setMapPosition] = useState([40, 0]);

  //when position state is updated the Map component is re-rendered
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  //use custom created to retrieve the global state stored in the URL
  const [mapLat, mapLng] = useUrlPosition();

  // sync mapPosition state with current lat and lng
  useEffect(
    function () {
      // so lat n lng values will be remembered even if we move back to the list
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  //synchronize mapPosition state with Geolocation state - introduces another re-render of the component
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  // if (!mapLat && !mapLng) return; center={[mapLat, mapLng]}
  return (
    // imperative way of navigating to another URL - NavLink is declarative way
    <div className={styles.mapContainer}>
      {/* only display the button if geolocation is not already loaded */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  //useMap hook is used to get the current instance of the map that is being displayed
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  //react leaflet library custom hook - useMapEvents - we pass in an object where we can define few properties for different types of event
  useMapEvents({
    //pass lat n lng(that comes from leaflet ) in the URL
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
