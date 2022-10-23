import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from '.';

function CreateReviewFormModal() {
    const [showModal, setShowModal] = useState(false);

    const clickedX = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm clickedX={clickedX} />
                </Modal>
            )}
        </>
    );
}

export default CreateReviewFormModal;
