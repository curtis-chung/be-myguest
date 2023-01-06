import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { ReactCalendar } from './index';

export function CheckInCalendarModal({ checkOutDate, checkInDate, setCheckInDate }) {
    const [showModal, setShowModal] = useState(false);

    const clickedX = () => {
        setShowModal(false)
    }

    return (
        <>
            <div onClick={() => setShowModal(true)} className="booking-container-2-box-content booking-container-2-box-content-50" style={{ fontSize: "12px", fontWeight: "500" }}>CHECK-IN {checkInDate.toDateString()}</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReactCalendar clickedX={clickedX} checkOutDate={checkOutDate} checkInDate={checkInDate} setCheckInDate={setCheckInDate} />
                </Modal>
            )}
        </>
    );
}

export function CheckoutCalendarModal({ checkInDate, checkOutDate, setCheckOutDate }) {
    const [showModal, setShowModal] = useState(false);

    const clickedX = () => {
        setShowModal(false)
    }

    return (
        <>
            <div onClick={() => setShowModal(true)} className="booking-container-2-box-content booking-container-2-box-content-50" style={{ fontSize: "12px", fontWeight: "500", borderLeft: "1px solid lightgray" }}>CHECKOUT {checkOutDate.toDateString()}</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReactCalendar clickedX={clickedX} checkInDate={checkInDate} checkOutDate={checkOutDate} setCheckOutDate={setCheckOutDate} />
                </Modal>
            )}
        </>
    );
}
