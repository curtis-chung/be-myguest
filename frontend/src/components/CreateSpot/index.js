import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import * as spotActions from "../../store/spot"
import "./CreateSpot.css"

const CreateSpotForm = ({ clickedX }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const spot = {
            address: address,
            city: city,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price,
        }

        const imageObj = { url: imgUrl, preview: true }

        const createdSpot = await dispatch(spotActions.createSpot(spot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (createdSpot) {
            console.log(createdSpot)
            clickedX()
            await dispatch(spotActions.getOneSpot(createdSpot.id))
            await dispatch(spotActions.createSpotImage(imageObj, createdSpot.id))
            history.push(`/spots/${createdSpot?.id}`)
        }
    }

    return (
        <div className='create-spot-container'>
            <div className="create-spot-container-header">
                <button onClick={clickedX} className='close-button'>x</button>
                <div className="create-spot-for-bemyguest">Become a Host</div>
            </div>
            <div className="create-spot-container-body">
                <form onSubmit={handleSubmit} className="create-spot-form-box">
                    <div className="create-spot-container-body-content">
                        <div className="welcome">Welcome to Be-myguest</div>
                        <div className='create-spot-inputs'>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        placeholder="Address"
                                        className="create-spot-input-fields"
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
                                        className="create-spot-input-fields"
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
                                        className="create-spot-input-fields"
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
                                        className="create-spot-input-fields"
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
                                        className="create-spot-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        placeholder="Description"
                                        className="create-spot-input-fields"
                                    />
                                </label>
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
                                        className="create-spot-input-fields"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={imgUrl}
                                        onChange={(e) => setImgUrl(e.target.value)}
                                        required
                                        placeholder="Photo URL"
                                        className="create-spot-input-fields"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="create-spot-button-div">
                            <button type="submit" className="create-spot-button">Let's Host</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSpotForm;
