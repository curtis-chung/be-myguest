import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import * as reviewActions from "../../store/review"
import "./CreateReview.css"

const CreateReviewForm = ({ clickedX }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { spotId } = useParams();
    spotId = parseInt(spotId)
    console.log(spotId)
    const sessionUser = useSelector((state) => state.session.user);

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            // spotId: spotId,
            // userId: parseInt(sessionUser.id),
            review: review,
            stars: parseInt(stars),
        }

        const createdReview = await dispatch(reviewActions.createReview(newReview, spotId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (createdReview) {
            console.log(createdReview)
            clickedX()
            // await dispatch(reviewActions.createReview(createdReview, spotId))
            history.push(`/spots/${spotId}`)
        }
    }

    return (
        <div className='create-review-container'>
            <div className="create-review-container-header">
                <button onClick={clickedX} className='close-button'>x</button>
                <div className="create-review-for-bemyguest">Review Spot</div>
            </div>
            <div className="create-review-container-body">
                <form onSubmit={handleSubmit} className="create-review-form-box">
                    <div className="create-review-container-body-content">
                        <div className="welcome">Welcome to Be-myguest</div>
                        <div className='create-review-inputs'>
                            <div className="text-area-div">
                                <textarea
                                    type="text"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                    placeholder="Review"
                                    className="create-review-text-area-fields"
                                />
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="number"
                                        value={stars}
                                        onChange={(e) => setStars(e.target.value)}
                                        required
                                        placeholder="# of stars"
                                        min="1"
                                        className="create-review-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                        </div>
                        <div className="create-review-button-div">
                            <button type="submit" className="create-review-button">Create Review</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateReviewForm;
