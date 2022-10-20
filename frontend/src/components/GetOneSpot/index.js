import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spot"
import "./GetOneSpot.css"
import { Modal } from '../../context/Modal';
import EditSpotForm from "../EditASpot";
// import DeleteSpot from "../DeleteASpot";

const GetOneSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    let spotImageArr;
    let spotImages = []

    const spotById = useSelector((state) => {
        return state?.spot?.oneSpot // {}
    })

    spotImageArr = spotById?.SpotImages

    if (spotImageArr) {
        spotImages[0] = spotImageArr[0]?.url
        spotImages[1] = spotImageArr[1]?.url
        spotImages[2] = spotImageArr[2]?.url
        spotImages[3] = spotImageArr[3]?.url
        spotImages[4] = spotImageArr[4]?.url
    }

    // console.log(spotImageArr)
    // console.log(spotById)
    // console.log(spotImages)

    const [editSpotModal, setEditSpotModal] = useState(false);

    const editSpotX = () => {
        setEditSpotModal(false)
    }

    const handleClick = async (e) => {
        e.preventDefault();

        const deleteSpot = await dispatch(spotActions.deleteSpot(spotId))
            .then(dispatch(spotActions.getAllSpot()))
            .then(history.push(`/`))
    }

    useEffect(() => {
        dispatch(spotActions.getOneSpot(spotId))
    }, [dispatch]);

    // if (!Object.values(spotById).length) return null

    return (
        <>
            {spotImageArr && spotById && spotImages && (
                <div className="get-one-spot-container">
                    <div className="get-one-spot-container-body">
                        <div className="get-one-spot-body-top">
                            <div className="spot-name">
                                <div>{spotById?.name}</div>
                            </div>
                            <div className="ratings-reviews-address">
                                <div className="spot-ratings">
                                    <div><i class="fa-solid fa-star"></i>{spotById?.avgRating}</div>
                                </div>
                                <div className="spot-reviews">
                                    <div>Reviews</div>
                                </div>
                                <div className="spot-address">
                                    <div>{spotById?.city}, {spotById?.state}, {spotById?.country}</div>
                                </div>
                            </div>
                        </div>

                        <div className="get-one-spot-body-middle">
                            <div className="spot-images-container-left display-image">
                                <img className="display-images large-image" src={spotImages[0]} />
                            </div>
                            <div className="spot-images-container-middle"></div>
                            <div className="spot-images-container-right">
                                <div className="spot-images-container-right-top">
                                    <div className="spot-images-container-right-top-left display-image">
                                        <img className="display-images" src={spotImages[1]} />
                                    </div>
                                    <div className="spot-images-container-right-middle"></div>
                                    <div className="spot-images-container-right-top-right display-image">
                                        <img className="display-images top-right-image" src={spotImages[2]} />
                                    </div>
                                </div>

                                <div className="spot-images-container-right-middle-horizontal"></div>

                                <div className="spot-images-container-right-bottom">
                                    <div className="spot-images-container-right-bottom-right display-image">
                                        <img className="display-images" src={spotImages[3]} />
                                    </div>
                                    <div className="spot-images-container-right-middle"></div>
                                    <div className="spot-images-container-right-bottom-left display-image">
                                        <img className="display-images bottom-right-image" src={spotImages[4]} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="spot-images-container-right-middle"></div>

                        <div className="get-one-spot-body-bottom">
                            <div>Entire home hosted by {spotById?.Owner?.firstName}</div>
                            <div>{spotById?.description}</div>
                        </div>

                        <div className="edit-spot-button-div">
                            <button onClick={() => setEditSpotModal(true)} className="become-a-host-button">
                                Edit
                            </button>
                            {editSpotModal &&
                                <Modal Modal onClose={() => setEditSpotModal(false)}>
                                    <EditSpotForm clickedX={editSpotX} />
                                </Modal>
                            }
                        </div>

                        <div>
                            <button onClick={handleClick} type="submit" className="delete-spot-button">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GetOneSpot;
