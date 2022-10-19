import { csrfFetch } from './csrf';

// Actions
const CREATE_SPOT = "spots/createSpot";
const GET_ALL_SPOT = "spots/getAllSpot";
const GET_ONE_SPOT = "spots/getOneSpot";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot";

// Action Creators
const createSpotAction = (spot) => ({
    type: CREATE_SPOT,
    spot
})

const getAllSpotAction = (list) => ({
    type: GET_ALL_SPOT,
    list
})

const getOneSpotAction = (spot) => ({
    type: GET_ONE_SPOT,
    spot
})

const editSpotAction = (spot) => ({
    type: EDIT_SPOT,
    spot
})

const deleteSpotAction = (id) => ({
    type: DELETE_SPOT,
    id
})

// Normalize data
function defaultState(a) {
    const s = {};
    a.forEach(b => {
        s[b.id] = b
    });
    return s
}

// Thunks

export const createSpot = (spot) => async (dispatch) => {

    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    // When the spot is successfully created
    if (response.ok) {
        const newSpot = await response.json()
        dispatch(createSpotAction(newSpot))
        return newSpot
    }
}

export const getAllSpot = () => async (dispatch) => {

    const response = await fetch("/api/spots")

    if (response.ok) {
        const allSpots = await response.json()
        dispatch(getAllSpotAction(allSpots))
    }
}

export const getOneSpot = (spotId) => async (dispatch) => {

    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const currentSpot = await response.json()
        const normalizedSpot = defaultState(currentSpot)
        dispatch(getOneSpotAction(normalizedSpot))
    }
}

export const editSpot = (spot) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const edittedSpotData = await response.json()
        dispatch(editSpotAction(edittedSpotData))
        return edittedSpotData
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        dispatch(deleteSpotAction(spotId))
    }

    return response
}

// Initial state for store
const initialState = {
    allSpot: {},
    oneSpot: {}
}

// Reducers

const spotReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case CREATE_SPOT:
            newState.allSpot[action.spot.id] = action.spot
            return newState

        case GET_ALL_SPOT:
            const allSpotsList = {};
            action.list.forEach(spot => {
                allSpotsList[spot.id] = spot
            })
            return newState.allSpot = allSpotsList

        case GET_ONE_SPOT:
            newState.oneSpot[action.spot.id] = action.spot
            return newState

        case EDIT_SPOT:
            newState.allSpot[action.spot.id] = action.spot
            return newState

        case DELETE_SPOT:
            delete newState.allSpot[action.id]
            return newState

        default:
            return state
    }
}

export default spotReducer;
