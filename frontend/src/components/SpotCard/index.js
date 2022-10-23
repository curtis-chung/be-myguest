import { Link } from "react-router-dom";
import "./Spotcard.css"

const SpotCard = ({ spot }) => {
    // console.log(spot)
    let spotRating;
    if (spot.avgRating == 0) {
        spotRating = "New"
    } else {
        spotRating = spot.avgRating
    }

    return (
        <div className="spot-card-container">
            <Link className="spot-card-link" to={`/spots/${spot.id}`}>
                <div className="spot-card-img-container">
                    <img className="spot-card-img" src={spot.previewImage} />
                </div>
                <div className="spot-card-body">
                    <div className="spot-card-body-top">
                        <div className="spot-card-location">{spot.city}, {spot.state}</div>
                        <div className="spot-card-rating"><i class="fa-solid fa-star"></i> {spotRating}
                        </div>
                    </div>
                    <div className="spot-card-body-middle">
                        <div className="spot-card-name">{spot.name}</div>
                    </div>
                    <div className="spot-card-body-bottom">
                        <div className="spot-card-price">${spot.price} night</div>
                    </div>
                </div>
            </Link >
        </div >
    )
}

export default SpotCard;
