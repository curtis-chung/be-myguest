import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spot"
import SpotPreview from "../SpotPreview";
import "./GetAllSpot.css"

const GetAllSpot = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const spotsObj = useSelector((state) => {
        return state.spot.allSpot // {}
    })

    const spotsArr = Object.values(spotsObj) // []

    // console.log(allSpots)
    // console.log(spotsArr)
    // console.log(spotActions)

    useEffect(() => {
        dispatch(spotActions.getAllSpot())
            .then(setIsLoaded(true))
    }, []);

    return (
        <>
            {isLoaded && (
                <div className="get-all-spot-container">
                    <div className="get-all-spot-body">
                        {spotsArr.map((spot, i) => (
                            <SpotPreview key={spot.id} spot={spot} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default GetAllSpot;
