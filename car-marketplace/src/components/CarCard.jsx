import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function CarCard({ car }) {
    const nav = useNavigate();

    const monthly = useMemo(() => {
        const p = Number(car.price);
        if (!Number.isFinite(p)) return null;
        return Math.round(p / 60); // fake 60-month payment
    }, [car.price]);

    const badgeClass = car.deal === "Great Deal" ? "" : "warn";

    return (
        <div className="card product">
            <div
                className="img"
                style={{ cursor: "pointer" }}
                onClick={() => nav(`/car/${car.id}`, { state: { car } })}
                title="View details"
            >
                <img src={car.image} alt={`${car.year} ${car.make} ${car.model}`} />
                <div className={`badge ${badgeClass}`}>{car.deal}</div>
            </div>

            <div className="body">
                <div className="spread">
                    <div className="price">${Number(car.price).toLocaleString()}</div>
                    <div className="stars">★ {car.rating}</div>
                </div>

                <div
                    className="title"
                    style={{ cursor: "pointer" }}
                    onClick={() => nav(`/car/${car.id}`, { state: { car } })}
                >
                    {car.year} {car.make} {car.model}
                </div>

                <div className="sub">
                    {car.body} • {Number(car.mileage).toLocaleString()} mi
                </div>

                <div className="meta">
                    <span>{car.location}</span>
                    <span className="pay">{monthly ? `~$${monthly}/mo` : ""}</span>
                </div>

                <div className="actions">
                    <button className="btn primary" onClick={() => nav(`/car/${car.id}`, { state: { car } })}>
                        View
                    </button>
                    <button className="btn">Save</button>
                </div>
            </div>
        </div>
    );
}