import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useHistory, useParams } from "react-router-dom";
import "./BookingModal.css"

export default function ConfirmBooking({ setIsValidBooking }) {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='booking-modal-container'>
                        <div className="booking-circle">✓</div>
                        <div className='booking-modal-div booking-modal-title'>Success!</div>
                        <div className='booking-modal-div booking-modal-body'>
                            Your booking has been confirmed.
                        </div>
                        <div className='booking-modal-div booking-modal-close' onClick={() => {
                            setShowModal(false); setIsValidBooking(false);
                        }}>
                            OK
                        </div>
                    </div>
                </Modal>
            )
            }
        </>
    );
}
