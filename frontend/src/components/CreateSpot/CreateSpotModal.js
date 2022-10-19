import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from "./index"

function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    const clickedX = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateSpotForm clickedX={clickedX} />
                </Modal>
            )}
        </>
    );
}

export default CreateSpotFormModal;
