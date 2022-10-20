import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spot"
import SpotPreview from "../SpotPreview";
import "./GetAllSpot.css"

const GetAllSpot = () => {
    const dispatch = useDispatch();
    let spotsArr;

    const spotsObj = useSelector((state) => {
        return state.spot // empty {}
    })

    spotsArr = Object.values(spotsObj) // empty []

    // console.log(allSpots)
    console.log(spotsArr)
    // console.log(spotActions)

    useEffect(() => {
        dispatch(spotActions.getAllSpot())
    }, [dispatch]);

    return (
        <>
            {spotsArr && (
                <div className="get-all-spot-container">
                    <div className="get-all-spot-body">
                        {spotsArr.map((spot) => (
                            <SpotPreview key={spot.id} spot={spot} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default GetAllSpot;
