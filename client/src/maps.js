import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MAPS_KEY } from './config/index'
import axios from 'axios';

const Map = ({ userId }) => {
    const [center, setCenter] = useState({ lat: 24.860966, lng: 66.990501 });
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        // Retrieve markers for the user from the database
        const fetchMarkers = async () => {
            const response = await axios.get(`/markers/${userId}`);
            setMarkers(response.data);
        };

        // // When the markers change, set the center to the last marker
        // if (markers.length > 0) {
        //     const lastMarker = markers[markers.length - 1];
        //     setCenter({ lat: lastMarker.lat, lng: lastMarker.lng });
        // }


        fetchMarkers();
    }, [userId]);

    const mapContainerStyle = {
        width: '50%',
        height: '400px',
    };

    const handleMapClick = async (event) => {
        const newMarker = {
            userId,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        // Save marker to the database
        await axios.post('/markers', newMarker);

        // Update markers state without triggering automatic recentering
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

        setCenter({ lat: newMarker.lat, lng: newMarker.lng });
    };

    const mapOptions = {
        zoomControl: false, // Disable zoom control
        streetViewControl: false, // Disable street view control
        fullscreenControl: false
    };


    return (
        <div className="flex justify-center">
            <LoadScript googleMapsApiKey={MAPS_KEY}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                    options={mapOptions}
                    onClick={handleMapClick}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                        />
                    ))}

                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;