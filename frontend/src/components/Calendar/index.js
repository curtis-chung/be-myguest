import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import "./Calendar.css"
import * as bookingActions from "../../store/booking"

export function ReactCalendar({ checkInOutDate, setCheckInOutDate, setErrors }) {
    // const [value, onChange] = useState([new Date().getTime() + (24 * 60 * 60 * 1000), new Date(new Date().getTime() + (24 * 60 * 60 * 1000) + (24 * 60 * 60 * 1000))]);
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const today = new Date()
    const checkInDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
    // console.log("value", value)
    const bookingsById = useSelector((state) => {
        return state?.booking?.currSpotBookings
    })

    const bookingsByUser = useSelector((state) => {
        return state?.booking?.currUserBookings
    })

    let dates = [];

    useEffect(() => {
        dispatch(bookingActions.getAllBookingsById(spotId));
        dispatch(bookingActions.getAllUserBookings());
    }, [dispatch])

    useEffect(() => {
        console.log("HMMM")

        Object.values(bookingsById).forEach((booking) => {
            function getDatesInRange(startDate, endDate) {
                const date = new Date(startDate.getTime());

                const dates = [];

                while (date <= endDate) {
                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }

                return dates;
            }

            const d1 = new Date(`${booking["startDate"]}`);
            const d2 = new Date(`${booking["endDate"]}`);

            const allDatesArr = (getDatesInRange(d1, d2));

            if (allDatesArr.length) {
                allDatesArr.forEach((date) => {
                    dates.push(date.toJSON().slice(0, 10))
                })
            }
        })

        Object.values(bookingsByUser).forEach((booking) => {
            function getDatesInRange(startDate, endDate) {
                const date = new Date(startDate.getTime());

                const dates = [];

                while (date <= endDate) {
                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }

                return dates;
            }

            const d1 = new Date(`${booking["startDate"]}`);
            const d2 = new Date(`${booking["endDate"]}`);

            const allDatesArr = (getDatesInRange(d1, d2));

            if (allDatesArr.length) {
                allDatesArr.forEach((date) => {
                    dates.push(date.toJSON().slice(0, 10))
                })
            }
        })
        // console.log("dates", dates)
    })

    if (!Object.values(bookingsById).length || !Object.values(bookingsByUser).length) return null;

    return (
        <DateRangePicker
            onChange={setCheckInOutDate}
            onClickDay={() => {
                setErrors({})
            }}
            value={checkInOutDate}
            isOpen={false}
            calendarIcon={null}
            clearIcon={null}
            tileDisabled={({ a, date, c }) => {
                // console.log("date", date)
                if (date.toJSON() <= today.toJSON()) return true
                if (dates.includes(date.toJSON().slice(0, 10))) return true
            }}
            showDoubleView={true}
            closeCalendar={true}
            calendarType={"US"}
            next2Label={null}
            prev2Label={null}
            selectRange={true}
            showFixedNumberOfWeeks={false}
            showNeighboringMonth={false}
            view={"month"}
            rangeDivider={false}
            open={true}
            minDetail={"month"}
            allowPartialRange={true}
        />
    );
}

// array from bookings
// [start date, end date] loop through all bookings + use comparison operators
