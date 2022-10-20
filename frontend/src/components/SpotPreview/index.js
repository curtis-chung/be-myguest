import { Link } from "react-router-dom";
import "./SpotPreview.css"

const SpotPreview = ({ spot }) => {
    // console.log(spot)
    return (
        <div className="spot-preview-container">
            <Link className="link-container" to={`/spots/${spot.id}`}>
                <div className="spot-image-container">
                    <img className="spot-image" src={spot.previewImage} />
                </div>
                <div className="spot-info-container">
                    <div className="spot-info-top">
                        <div className="spot-location">{spot.city}, {spot.state}</div>
                        <div className="spot-rating"><i class="fa-solid fa-star"></i> {spot.avgRating}
                        </div>
                    </div>
                    <div className="spot-info-bottom">
                        <div className="spot-name">{spot.name}</div>
                        <div className="spot-price">${spot.price} night</div> </div>

                </div>
            </Link>
        </div>

    )
}

export default SpotPreview;
