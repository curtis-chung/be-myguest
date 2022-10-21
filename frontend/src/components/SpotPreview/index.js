import { Link } from "react-router-dom";
import "./SpotPreview.css"

const SpotPreview = ({ spot }) => {
    // console.log(spot)
    return (
        <div className="spot-preview-container-1">
            <Link className="spot-preview-link-container" to={`/spots/${spot.id}`}>
                <div className="spot-preview-container-2">
                    <img className="spot-preview" src={spot.previewImage} />
                </div>
                <div className="spot-preview-container-3">
                    <div className="spot-preview-top">
                        <div className="spot-preview-spot-location" style={{ fontSize: "16px", fontWeight: "600" }}>{spot.city}, {spot.state}</div>
                        <div className="spot-preview-spot-rating"><i class="fa-solid fa-star"></i> {spot.avgRating}
                        </div>
                    </div>
                    <div className="spot-preview-middle">
                        <div className="spot-preview-spot-name" style={{ fontSize: "16px", fontWeight: "200" }}>{spot.name}</div>
                    </div>
                    <div className="spot-preview-bottom">
                        <div className="spot-preview-spot-price" style={{ fontSize: "16px", fontWeight: "600" }}>${spot.price} night</div>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default SpotPreview;
