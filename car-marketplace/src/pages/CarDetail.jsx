import { useLocation, useNavigate } from "react-router-dom";

export default function CarDetail() {
    const { state } = useLocation();
    const nav = useNavigate();
    const car = state?.car;

    if (!car) return <div className="container">No listing loaded.</div>;

    return (
        <div className="container">
            <button className="btn" onClick={() => nav(-1)}>← Back</button>
            <div className="detail">
                <div>
                    <img src={car.image} style={{ width: "100%" }} />
                </div>
                <div>
                    <h1>{car.year} {car.make} {car.model}</h1>
                    <div className="detail-price">${car.price.toLocaleString()}</div>
                    <div className="spec-row"><span>Mileage</span><span>{car.mileage.toLocaleString()}</span></div>
                    <div className="spec-row"><span>Location</span><span>{car.location}</span></div>
                </div>
            </div>
        </div>
    );
}