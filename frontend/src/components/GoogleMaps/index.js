import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const SimpleMap = ({ lat, lng, name }) => {


    //This sets the center of the map. This must be set BEFORE the map loads
    // console.log(lat)

    const [currentPosition, setCurrentPosition] = useState({ lat: lat, lng: lng })
    // console.log(currentPosition)

    // This is the equivalent to a script tag

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
    })

    const containerStyle = {
        width: '1120px',
        height: '480px',
    };

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    return (
        // Important! Always set the container height explicitly

        <div className="map_page__container">

            <div style={{ height: '254px', width: '315px' }}>
                {isLoaded && <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={15}
                    center={currentPosition}
                    onUnmount={onUnmount}
                >
                    <Marker
                        position={currentPosition}
                        title={name}
                        icon={<i class="fa-solid fa-house"></i>}
                        streetView={false} />
                </GoogleMap>}
            </div>

        </div>
    );

}

export default SimpleMap
