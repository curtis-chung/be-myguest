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
import AirCover from "../../images/aircover.png"
import { CheckInCalendarModal, CheckoutCalendarModal } from "../Calendar/Calendar";
import { ReactCalendar } from "../Calendar";

const GetOneSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // console.log("sessionUser", sessionUser) // {}
    const today = new Date();
    const newDate = today.setDate(today.getDate() + 30);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const thirtyDays = new Date(newDate).toLocaleDateString(undefined, options).split(",")[1];

    const [isLoaded, setIsLoaded] = useState(false);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));

    let spotImageArr;
    let spotImages = []

    const state = useSelector((state) => {
        return state
    })

    console.log("state", state, checkInDate, checkOutDate)

    const spotById = useSelector((state) => {
        return state?.spot?.oneSpot // {}
    })

    let spotRating;

    if (!spotById.avgStarRating) {
        spotRating = "New"
    } else {
        spotRating = spotById.avgStarRating.toFixed(1)
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

    let reviewsArr = [];
    // console.log("reviews", reviewsArr)

    if (existingReviews) {
        reviewsArr = reviewsBySpotId
        // console.log("reviews", reviewsArr)
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

    // // console.log("reviewsArr", reviewsArr)

    // //reviewed already
    // let hasReview = false
    // console.log(reviewsArr)
    // reviewsArr.forEach(review => {
    //     console.log("inforeach", review)
    //     if (review?.userId === sessionUser.id) {
    //         hasReview = true;
    //     }
    // })

    // console.log(reviewsArr)
    // const reviewUserId = reviewsArr?.map(review => review.User.id)
    // let hasReview = true
    // console.log(reviewUserId)
    // if (reviewUserId) {

    //     if (reviewUserId.includes(sessionUser.id)) {
    //         hasReview = false
    //     }
    // }

    // console.log("owner", isSpotOwner, "loggedin", isLoggedIn, "hasrev", hasReview)

    // console.log(reviewUserId)

    let allowCreateReview = false;
    if ((sessionUser?.id !== spotById?.ownerId) && (sessionUser)) {
        allowCreateReview = true;
    }
    reviewsArr.forEach(review => {
        // console.log("inforeach", review)
        if (review?.userId === sessionUser?.id) {
            allowCreateReview = false;
        }
    })

    useEffect(() => {
        dispatch(spotActions.getOneSpot(spotId))
        dispatch(reviewActions.getCurrentSpotReviews(spotId))
            .then(setExistingReviews(true))
            .then(setIsLoaded(true))
        return () => {
            dispatch(spotActions.cleanUpSpot()); dispatch(reviewActions.cleanUpReviews(spotId))
        }
    }, [dispatch]);

    if (!Object.values(spotById).length) return null;
    // console.log("spotById", spotById)

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
                                        <div><i class="fa-solid fa-star">&nbsp;</i>{spotRating}</div>
                                    </div>
                                    <div style={{ marginRight: "10px" }}>·</div>
                                    <div className="spot-reviews">
                                        <div>{numReviews}</div>
                                    </div>
                                    <div style={{ marginRight: "10px" }}>·</div>
                                    <div className="spot-reviews" style={{ alignItems: "center" }}><i class="fa-solid fa-medal" style={{ fontSize: "12px" }}></i>&nbsp;Superhost</div>
                                    <div style={{ marginRight: "10px" }}>·</div>
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
                            <div>
                                <div className="spot-width spot-host">Entire home hosted by {spotById?.Owner?.firstName}</div>
                                <div className="spot-width spot-specifications">
                                    <div className="spot-spec">
                                        <i class="fa-solid fa-computer" style={{ fontSize: "18px", marginRight: "16px" }}></i>
                                        <div>
                                            <div className="spec-title">Dedicated workspace</div>
                                            <div className="spec-body">A private room with wifi that’s well-suited for working.</div>
                                        </div>
                                    </div>
                                    <div className="spot-spec">
                                        <i class="fa-solid fa-door-open" style={{ fontSize: "18px", marginRight: "16px" }}></i>
                                        <div>
                                            <div>
                                                <div className="spec-title">Self check-in</div>
                                                <div className="spec-body">Check yourself in with the keypad.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="spot-spec">
                                        <i class="fa-solid fa-medal" style={{ fontSize: "18px", marginRight: "16px" }}></i>
                                        <div>
                                            <div className="spec-title">{spotById?.Owner?.firstName} is a Superhost</div>
                                            <div className="spec-body">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                                        </div>
                                    </div>
                                    <div className="spot-spec" style={{ margin: "0" }}>
                                        <i class="fa-solid fa-calendar" style={{ fontSize: "18px", marginRight: "16px" }}></i>
                                        <div className="spec-title">
                                            Free cancellation before {thirtyDays}.
                                        </div>
                                    </div>
                                </div>
                                <div className="spot-width air-cover">
                                    <img src={AirCover} style={{ width: "114px" }} />
                                    <div style={{ marginTop: "21px" }}>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                                    </div>
                                </div>
                                <div className="spot-description">{spotById?.description}</div>
                            </div>
                            <div style={{ marginLeft: "5%" }}>
                                <div className="booking-container">
                                    <div className="booking-container-1">
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ fontWeight: "600", fontSize: "22px", marginRight: "5px", lineHeight: "20px" }}>
                                                {spotById.price.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                            </span>
                                            <div>
                                                night
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                                            <i class="fa-solid fa-star" style={{ fontSize: "12px" }}>&nbsp;</i>{spotRating}<div style={{ margin: "0 5px" }}>·</div><div style={{ color: "#717171" }}>{numReviews}</div>
                                        </div>
                                    </div>
                                    <form className="booking-container-2">
                                        <div className="booking-container-2-box booking-container-2-top">
                                            <ReactCalendar checkOutDate={checkOutDate} checkInDate={checkInDate} setCheckInDate={setCheckInDate} />
                                        </div>
                                        <button className="reserve-button" type="submit">Reserve</button>
                                        <div className="no-charge">You won't be charged yet.</div>
                                    </form>
                                    <div className="booking-container-3">
                                        <div className="pricing-breakdown" style={{ display: "flex", alignItems: "center" }}>
                                            <div>
                                                {spotById.price.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })} x 2 nights
                                            </div>
                                            <div>
                                                {(spotById.price * 2).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                            </div>
                                        </div>
                                        <div className="pricing-breakdown" style={{ display: "flex", alignItems: "center" }}>
                                            <div>
                                                Cleaning fee
                                            </div>
                                            <div>
                                                {(spotById.price * 2 * .05).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                            </div>
                                        </div>
                                        <div className="pricing-breakdown" style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
                                            <div>
                                                Service fee
                                            </div>
                                            <div>
                                                {(spotById.price * 2 * .03).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "600", fontSize: "16px", lineHeight: "20px", padding: "25px 0", borderTop: "1px solid lightgray" }}>
                                        <div>
                                            Total before taxes
                                        </div>
                                        <div>
                                            {(spotById.price * 2 + spotById.price * 2 * .05 + spotById.price * 2 * .03).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="rare-find">
                                    <div>
                                        <span style={{ fontWeight: "600" }}>This is a rare find.</span> {spotById.Owner.firstName}'s place on beMyGuest is usually fully booked.
                                    </div>
                                    <i class="fa-regular fa-gem" style={{ fontSize: "32px", color: "#ff385c" }}></i>
                                </div>
                            </div>
                        </div>
                        <div className="spot-review-container">
                            <div className="reviews-and-button">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <i class="fa-solid fa-star" style={{ fontSize: "16px" }}>&nbsp;</i>
                                    {spotRating}
                                    <div style={{ margin: "0 5px" }}>·</div>
                                    {numReviews}
                                </div>
                                {allowCreateReview && (<><button onClick={() => setCreateReviewModal(true)} className="create-a-review-button">
                                    Create Review
                                </button>
                                    {createReviewModal &&
                                        <Modal Modal onClose={() => setCreateReviewModal(false)}>
                                            <CreateReviewForm clickedX={createReviewX} />
                                        </Modal>
                                    }</>)}
                            </div>
                            <div className="spot-review-container-card">
                                {reviewsArr.map((review) => (
                                    <ReviewPreview key={review.id} review={review} spotId={spotId} sessionUser={sessionUser} created={review.updatedAt} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GetOneSpot;
