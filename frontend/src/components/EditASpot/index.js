import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spot"
import "./EditASpot.css"

const EditSpotForm = ({ clickedX }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spotById = useSelector((state) => {
        return state?.spot?.oneSpot
    })

    console.log(spotById)

    const [address, setAddress] = useState(spotById?.address);
    const [city, setCity] = useState(spotById?.city);
    const [state, setState] = useState(spotById?.state);
    const [country, setCountry] = useState(spotById?.country);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState(spotById?.name);
    const [description, setDescription] = useState(spotById?.description);
    const [price, setPrice] = useState(spotById?.price);
    const [imgUrl, setImgUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let spot = {
            address: address,
            city: city,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price,
        }

        const editSpot = await dispatch(spotActions.editSpot(spot, spotId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    useEffect(() => {
        dispatch(spotActions.getOneSpot(spotId))
    }, [dispatch]);

    return (
        <div className='edit-spot-container'>
            <div className="edit-spot-container-header">
                <button onClick={clickedX} className='close-button'>x</button>
                <div className="edit-spot-for-bemyguest">Edit Review</div>
            </div>
            <div className="edit-spot-container-body">
                <form onSubmit={handleSubmit} className="edit-spot-form-box">
                    <div className="edit-spot-container-body-content">
                        <div className="welcome">Welcome to Be-myguest</div>
                        <div className='edit-spot-inputs'>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        placeholder="Address"
                                        className="edit-spot-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                        placeholder="City"
                                        className="edit-spot-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                        placeholder="State"
                                        className="edit-spot-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                        placeholder="Country"
                                        className="edit-spot-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Name"
                                        className="edit-spot-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div className="text-area-div">
                                <textarea
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Description"
                                    className="edit-spot-text-area-fields"
                                />
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                        placeholder="Price"
                                        min="1"
                                        className="edit-spot-input-fields"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="edit-spot-button-div">
                            <button type="submit" className="edit-spot-button">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSpotForm;
