import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spot"
import SpotCard from "../SpotCard";
import "./GetAllSpot.css"

const GetAllSpot = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const spotsObj = useSelector((state) => {
        return state?.spot?.allSpot // {}
    })

    let spotsArr;
    if (spotsObj) {
        spotsArr = Object.values(spotsObj)
        setIsLoaded(true)
    }

    // console.log(allSpots)
    // console.log(spotsArr)
    // console.log(spotActions)

    useEffect(() => {
        dispatch(spotActions.getAllSpot())
    }, []);

    return (
        <>
            {isLoaded && (
                <div className="get-all-spot-container">
                    {spotsArr?.map((spot) => (
                        <SpotCard key={spot.id} spot={spot} />
                    ))}
                </div>
            )}
        </>
    )
}

export default GetAllSpot;
