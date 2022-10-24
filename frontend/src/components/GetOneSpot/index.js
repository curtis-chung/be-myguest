import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spot";
import * as reviewActions from "../../store/review";
import "./GetOneSpot.css";
import { Modal } from '../../context/Modal';
import EditSpotForm from "../EditASpot";
import CreateReviewForm from "../CreateReview";
import ReviewPreview from "../ReviewPreview";

const GetOneSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // console.log("sessionUser", sessionUser) // {}

    const [isLoaded, setIsLoaded] = useState(false);

    let spotImageArr;
    let spotImages = []

    const spotById = useSelector((state) => {
        return state?.spot?.oneSpot // {}
    })

    let spotRating;

    if (!spotById.avgStarRating) {
        spotRating = "New"
    } else {
        spotRating = `${spotById.avgStarRating}`
    }

    spotImageArr = spotById?.SpotImages

    if (spotImageArr) {
        spotImages[0] = spotImageArr[0]?.url
        spotImages[1] = spotImageArr[1]?.url
        spotImages[2] = spotImageArr[2]?.url
        spotImages[3] = spotImageArr[3]?.url
        spotImages[4] = spotImageArr[4]?.url
    }

    // console.log(spotImageArr)
    // console.log("spotById", spotById)
    // console.log(spotImages)

    // Edit Spot
    const [editSpotModal, setEditSpotModal] = useState(false);
    const editSpotX = () => {
        setEditSpotModal(false)
    }

    // Reviews
    const [existingReviews, setExistingReviews] = useState(false);
    const reviewsBySpotId = useSelector((state) => {
        return Object.values(state?.review?.currentSpotReviews)
    })
    let reviewsArr;

    if (existingReviews) {
        reviewsArr = reviewsBySpotId
    }
    // } else {
    //     reviewsArr = "No reviews yet"
    // }

    //console.log("checking review dispatcher", reviewsArr)

    // Create Review
    const [createReviewModal, setCreateReviewModal] = useState(false);

    const createReviewX = () => {
        setCreateReviewModal(false)
    }

    // # of reviews
    let numReviews;
    if (!reviewsArr) {
        numReviews = "No reviews yet"
    } else {
        numReviews = `${reviewsArr.length} reviews`
    }

    // Delete spots
    const handleClick = async (e) => {
        e.preventDefault();

        const deleteSpot = await dispatch(spotActions.deleteSpot(spotId))
            .then(dispatch(spotActions.getAllSpot()))
            .then(history.push(`/`))
    }



    // Checks

    //is spot owner
    let isSpotOwner = false
    // console.log(sessionUser.id)
    // console.log(spotById.ownerId)

    if (sessionUser?.id === spotById?.ownerId) {
        isSpotOwner = true
    }

    //is logged in
    let isLoggedIn = false

    if (sessionUser) {
        isLoggedIn = true
    }

    // console.log("reviewsArr", reviewsArr)

    //reviewed already
    // let hasReview = false
    // console.log(reviewsArr)
    // if (reviewsArr.length) {
    //     console.log("inloop", reviewsArr)
    //     reviewsArr.forEach(review => {
    //         console.log("inforeach", review)
    //         if (review?.userId === sessionUser.id) {
    //             hasReview = true;
    //         }
    //     })
    // }
    // console.log(reviewsArr)
    const reviewUserId = reviewsArr?.map(review => review.User.id)
    // console.log(reviewUserId)

    useEffect(() => {
        dispatch(spotActions.getOneSpot(spotId))
        dispatch(reviewActions.getCurrentSpotReviews(spotId))
            .then(setExistingReviews(true))
            .then(setIsLoaded(true))
        return () => {
            dispatch(spotActions.cleanUpSpot()); dispatch(reviewActions.cleanUpReviews(spotId))
        }
    }, [dispatch]);

    return (
        <>
            {isLoaded && (
                <div className="get-one-spot-container">
                    <div className="get-one-spot-container-body">
                        <div className="get-one-spot-body-top">
                            <div className="get-one-spot-body-top-left">
                                <div className="spot-name">
                                    <div>{spotById?.name}</div>
                                </div>
                                <div className="ratings-reviews-address">
                                    <div className="spot-ratings">
                                        <div><i class="fa-solid fa-star"></i>{spotRating}</div>
                                    </div>
                                    {/* <div>·</div> */}
                                    <div className="spot-reviews">
                                        <div>{numReviews}</div>
                                    </div>
                                    {/* <div>·</div> */}
                                    <div className="spot-address">
                                        <div>{spotById?.city}, {spotById?.state}, {spotById?.country}</div>
                                    </div>
                                </div>
                            </div>
                            {isSpotOwner && (<div className="get-one-spot-body-top-right">
                                <button onClick={() => setEditSpotModal(true)} className="edit-delete-spot-button">Edit</button>
                                {editSpotModal &&
                                    <Modal Modal onClose={() => setEditSpotModal(false)}>
                                        <EditSpotForm clickedX={editSpotX} />
                                    </Modal>
                                }
                                <button onClick={handleClick} type="submit" className="edit-delete-spot-button">Delete</button>
                            </div>)}
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
                            <div className="spot-host">Entire home hosted by {spotById?.Owner?.firstName}</div>
                            <div className='spot-line'></div>
                            <div className="spot-description">{spotById?.description}</div>
                            <div className='spot-line'></div>
                            <div className="spot-review-container">
                                {isLoggedIn && !isSpotOwner && !reviewUserId.includes(sessionUser.id) && (<div>
                                    <button onClick={() => setCreateReviewModal(true)} className="create-a-review-button">
                                        Create Review
                                    </button>
                                    {createReviewModal &&
                                        <Modal Modal onClose={() => setCreateReviewModal(false)}>
                                            <CreateReviewForm clickedX={createReviewX} />
                                        </Modal>
                                    }
                                </div>)}
                                {/* <div>
                                    <button onClick={() => setCreateReviewModal(true)} className="create-a-review-button">
                                        Create Review
                                    </button>
                                    {createReviewModal &&
                                        <Modal Modal onClose={() => setCreateReviewModal(false)}>
                                            <CreateReviewForm clickedX={createReviewX} />
                                        </Modal>
                                    }
                                </div> */}
                                <div className="spot-review-container-card">
                                    {reviewsArr.map((review) => (
                                        <ReviewPreview key={review.id} review={review} spotId={spotId} sessionUser={sessionUser} />
                                    ))}
                                </div>
                            </div>
                            <div className='spot-line'></div>
                            {/* <div className="create-review-button-div">
                                <button onClick={() => setCreateReviewModal(true)} className="create-a-review-button">
                                    Create Review
                                </button>
                                {createReviewModal &&
                                    <Modal Modal onClose={() => setCreateReviewModal(false)}>
                                        <CreateReviewForm clickedX={createReviewX} />
                                    </Modal>
                                }
                            </div> */}
                        </div>




                    </div>
                </div>
            )}
        </>
    )
}

export default GetOneSpot;
