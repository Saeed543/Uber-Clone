import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { MAPS_KEY, REACT_APP_API_URL } from '../config/index'
import axios from 'axios';
import Navbar from "./navbar";


const Map = (userData) => {
    const user = userData.user;
    const userId = user.googleId;
    const url = `${REACT_APP_API_URL}/markers/get?userId=${userId}`

    const [center, setCenter] = useState({ lat: 24.860966, lng: 66.990501 });
    const [markers, setMarkers] = useState([]);


    useEffect(() => {
        const fetchMarkers = async () => {
            const response = await axios.get(url);
            const responseMarkers = await response.data;

            setMarkers(responseMarkers);
            return response;
        };
        fetchMarkers()
    }, [url]);

    // console.log(userId)

    const renderMarkers = () => {
        return markers.map((marker, i) => {
            return (
                <MarkerF key={i} position={{ lat: marker.lat, lng: marker.lng }} />
            );
        });
    }

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
        try {
            // Save marker to the database
            await axios.post(`${REACT_APP_API_URL}/markers/post`, newMarker);

            // Update markers state without triggering automatic recentering
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

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
                        {renderMarkers()}

                    </GoogleMap>
                </LoadScript>
            </div>
        </>
    );
};

export default Map;