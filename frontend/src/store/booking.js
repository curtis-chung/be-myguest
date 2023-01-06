import { csrfFetch } from './csrf';

const GET_ALL_BOOKING_BY_ID = "spots/getAllBookingsById";
const CLEAN_UP_BOOKING = "spots/cleanUpBooking"

const getAllBookingsByIdAction = (payload) => ({
    type: GET_ALL_BOOKING_BY_ID,
    payload
});

export const cleanUpBookings = () => {
    return {
        type: CLEAN_UP_BOOKING
    }
}

export const getAllBookingsById = (spotId) => async (dispatch) => {
    console.log("spotId", spotId, typeof spotId)
    const response = await fetch(`/api/spots/${spotId}/bookings`)

    if (response.ok) {
        const currSpotBookings = await response.json()
        console.log("currSpotBookings", currSpotBookings)
        dispatch(getAllBookingsByIdAction(currSpotBookings))
    }
}

const initialState = {
    currUserBookings: {},
    currSpotBookings: {}
}

const bookingReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {

        case GET_ALL_BOOKING_BY_ID:
            const allBookingsList = {};
            action.payload.Bookings.forEach((booking, i) => {
                allBookingsList[i] = booking
            })
            newState.currSpotBookings = allBookingsList
            return newState

        case CLEAN_UP_BOOKING:
            newState.currUserBookings = {}
            newState.currSpotBookings = {}
            return newState

        default:
            return state
    }
}

export default bookingReducer;
