import "./ReviewPreview.css"
import * as spotActions from "../../store/spot";
import * as reviewActions from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const ReviewPreview = ({ review, spotId, sessionUser, created }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = `${new Date(created).toLocaleDateString(undefined, options).split(" ")[1] + " " + new Date(created).toLocaleDateString(undefined, options).split(" ")[3]}`;
    // console.log(date)
    // Delete review
    const handleDelete = async (e) => {
        e.preventDefault();

        const deleteReview = await dispatch(reviewActions.deleteReview(review.id))
            .then(() => dispatch(spotActions.getOneSpot(spotId)))
            .then(() => dispatch(reviewActions.getCurrentSpotReviews(spotId)))
            .then(history.push(`/spots/${spotId}`))
    }

    let isReviewOwner = false;
    if (sessionUser?.id === review?.userId) isReviewOwner = true
    // console.log("review", review)
    // console.log("hd", handleDelete)
    // console.log("sessionUser", sessionUser)
    return (
        <div className="review-preview-container">
            <div className="review-preview-container-top">
                <div className="review-preview-container-top-left">
                    <div className="review-avatar">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div>
                        <div className="review-user-name">{review?.User?.firstName}</div>
                        <div style={{ fontSize: "14px", fontWeight: "300", lineHeight: "20px" }}>{date}</div>
                    </div>
                </div>
                <div className="review-preview-container-top-right">
                    {isReviewOwner && (<div>
                        <button onClick={handleDelete} type="submit" className="edit-delete-spot-button">Delete</button>
                    </div>)}
                </div>
            </div>
            <div className="review-preview-container-bottom">
                <div className="review-user-review">{review?.review}</div>
            </div>
        </div>
    )
}

export default ReviewPreview;
