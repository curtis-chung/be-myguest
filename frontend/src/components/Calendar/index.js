// import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export function CheckInReactCalendar({ checkOutDate, checkInDate, setCheckInDate }) {
//     // console.log("ABC", checkInDate, "BCD", setCheckInDate)
//     // const [date, setDate] = useState(new Date());

//     // const state = useSelector((state) => {
//     //     return state
//     // })

//     // console.log("state1", state)

//     // const onChange = async date => {
//     //     setDate(date);
//     // }

//     return (
//         <div>
//             <Calendar onChange={setCheckInDate} value={checkInDate} tileDisabled={({ a, date, c }) => {
//                 if (date.toJSON() <= today.toJSON()) return true
//                 // console.log("AB", date.toJSON(), "CD", today.toJSON())
//             }} />
//         </div>
//     );
// }

// export function CheckOutReactCalendar({ checkInDate, checkOutDate, setCheckOutDate }) {
//     // const [date, setDate] = useState(new Date());

//     // const state = useSelector((state) => {
//     //     return state
//     // })

//     // console.log("state1", state)

//     return (
//         <div>
//             <Calendar onChange={setCheckOutDate} value={checkOutDate} tileDisabled={({ a, date, c }) => {
//                 if (date.toJSON() <= today.toJSON() || date.toJSON() <= checkInDate.toJSON()) return true
//                 // console.log("AB", date.toJSON(), "CD", today.toJSON())
//             }} />
//         </div>
//     );
// }

// // // .toJSON()
// // // tileDisabled={({ date }) => date.getDate() === date1}

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

    let dates = [];

    useEffect(() => {
        dispatch(bookingActions.getAllBookingsById(spotId))
    }, [dispatch])

    useEffect(() => {

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
        console.log("dates", dates)
    })

    if (!Object.values(bookingsById).length) return null;

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
        />
    );
}

// array from bookings
// [start date, end date] loop through all bookings + use comparison operators
