import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from "./index"

function EditSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    const clickedX = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpotForm clickedX={clickedX} />
                </Modal>
            )}
        </>
    );
}

export default EditSpotFormModal;
