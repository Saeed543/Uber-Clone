import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { MAPS_KEY } from '../config/index'
import Navbar from "./navbar";


const Map = (userData) => {
    const user = userData.user;

    const [center, setCenter] = useState({ lat: 24.860966, lng: 66.990501 });
    const [markers, setMarkers] = useState();

    const mapContainerStyle = {
        width: '50%',
        height: '400px',
    };

    const handleMapClick = (event) => {
        const newMarker = {
            // userId,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        try {

            setMarkers(newMarker);

            setCenter({ lat: newMarker.lat, lng: newMarker.lng });
        } catch (e) {
            console.log(e)
        }
    };

    const mapOptions = {
        zoomControl: false, // Disable zoom control
        streetViewControl: false, // Disable street view control
        fullscreenControl: false
    };

    return (
        <>
            <Navbar user={user} />
            <div className="flex justify-center">
                <LoadScript googleMapsApiKey={MAPS_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={15}
                        options={mapOptions}
                        onClick={handleMapClick}
                    >
                        <MarkerF
                            position={markers}
                        />

                    </GoogleMap>
                </LoadScript>
            </div>
        </>
    );
};

export default Map;