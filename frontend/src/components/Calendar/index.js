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
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import "./Calendar.css"

export function ReactCalendar({ checkInOutDate, setCheckInOutDate }) {
    // const [value, onChange] = useState([new Date().getTime() + (24 * 60 * 60 * 1000), new Date(new Date().getTime() + (24 * 60 * 60 * 1000) + (24 * 60 * 60 * 1000))]);

    const today = new Date()
    const checkInDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
    // console.log("value", value)

    // useEffect(() => {
    //     setCheckInOutDate(value)
    // })

    return (
        <DateRangePicker
            onChange={setCheckInOutDate}
            value={checkInOutDate}
            isOpen={false}
            calendarIcon={null}
            clearIcon={null}
            tileDisabled={({ a, date, c }) => {
                if (date.toJSON() <= today.toJSON() || date.toJSON() <= checkInDate.toJSON()) return true
            }}
            showDoubleView={true}
            closeCalendar={false}
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
