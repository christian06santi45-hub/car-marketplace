import { Link } from "react-router-dom";
import { carImageUrl } from "../services/carImages";

export default function Home() {
    // Featured "inventory" hero (demo)
    const featured = {
        make: "Volvo",
        model: "XC60",
        year: "2026",
        price: 52995,
        lease: 629,
        apr: "0.00%",
        allowance: 3000,
        image: carImageUrl({ make: "Volvo", model: "XC60", year: "2026", seed: 11 }),
    };

    const shopTile = carImageUrl({ make: "Volvo", model: "V90", year: "2025", seed: 22 });
    const serviceTile = carImageUrl({ make: "Volvo", model: "S60", year: "2024", seed: 33 });

    return (
        <>
            {/* PROMO STRIP */}
            <div className="promo">
                <span>
                    Limited-time offers • <Link to="/shop">Browse inventory</Link>
                </span>
            </div>

            {/* HERO */}
            <section className="hero">
                <img src={featured.image} alt={`${featured.year} ${featured.make} ${featured.model}`} />
                <div className="container hero-content">
                    <div className="offer">
                        <h1>
                            {featured.year} {featured.make} {featured.model}
                        </h1>

                        <div className="offer-grid">
                            <div className="offer-box">
                                <div className="offer-label">Lease from</div>
                                <div className="offer-big">${featured.lease}</div>
                                <div className="offer-sub">/mo • 36 months</div>
                            </div>

                            <div className="offer-box">
                                <div className="offer-label">APR as low as</div>
                                <div className="offer-big">{featured.apr}</div>
                                <div className="offer-sub">up to 36 months</div>
                            </div>

                            <div className="offer-box">
                                <div className="offer-label">Allowance</div>
                                <div className="offer-big">${featured.allowance.toLocaleString()}</div>
                                <div className="offer-sub">qualified buyers</div>
                            </div>
                        </div>

                        <div className="offer-cta">
                            <Link className="btn" to="/shop">VIEW INVENTORY</Link>
                            <Link className="btn dark" to="/service">SCHEDULE SERVICE</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TILES */}
            <section className="tiles">
                <Link to="/shop" className="tile" aria-label="Shop inventory">
                    <img src={shopTile} alt="Shop inventory" />
                    <div className="tile-label">SHOP</div>
                </Link>

                <Link to="/service" className="tile" aria-label="Service">
                    <img src={serviceTile} alt="Service" />
                    <div className="tile-label">SERVICE</div>
                </Link>
            </section>
        </>
    );
}