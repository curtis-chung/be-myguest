import { csrfFetch } from './csrf';

// Actions
const GET_CURRENT_SPOT_REVIEWS = "reviews/getCurrentSpotReviews";

// Action Creators
const getCurrentSpotReviewAction = (list) => ({
    type: GET_CURRENT_SPOT_REVIEWS,
    list
})

// Thunks
export const createReview = (review, spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    // When the Review is successfully created
    if (response.ok) {
        const newReview = await response.json()
        return newReview
    }
}

export const getCurrentSpotReviews = (spotId) => async (dispatch) => {

    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const obj = await response.json()
        dispatch(getCurrentSpotReviewAction(obj.Reviews))
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    })

    return response
}

// Initial state for store
const initialState = {
    currentSpotReviews: {}
}

// Reducers

const reviewReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_CURRENT_SPOT_REVIEWS:
            const allReviewsList = {};
            action.list.forEach(review => {
                allReviewsList[review.id] = review
            })
            newState.currentSpotReviews = allReviewsList
            return newState
        default:
            return state
    }
}

export default reviewReducer;
