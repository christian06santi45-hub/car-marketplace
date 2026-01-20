import { useMemo, useState } from "react";
import { Filters } from "../components/Filters";
import { CarCard } from "../components/CarCard";
import { carImageUrl } from "../services/carImages";

const cities = ["Chicago, IL", "Dallas, TX", "Phoenix, AZ", "Atlanta, GA", "Denver, CO"];
const bodies = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Wagon"];

function makeListings(q) {
    return Array.from({ length: 18 }, (_, i) => {
        const price = 12000 + Math.floor(Math.random() * 28000);
        const mileage = 12000 + Math.floor(Math.random() * 125000);
        const body = bodies[i % bodies.length];
        const location = cities[i % cities.length];
        const image = `https://picsum.photos/seed/${encodeURIComponent(q.make + q.model + i)}/900/600`;

        const deal = price < 18000 ? "Great Deal" : price < 24000 ? "Good Deal" : "Fair Price";

        return {
            id: `${q.make}-${q.model}-${q.year}-${i}`,
            make: q.make,
            model: q.model,
            year: q.year,
            price,
            mileage,
            body,
            location,
            image,
            deal,
            rating: (3.8 + Math.random() * 1.1).toFixed(1),
        };
    });
}

export default function Search() {
    const [query, setQuery] = useState({ make: "", model: "", year: "" });
    const [listings, setListings] = useState([]);

    // Sidebar state
    const [bodyFilter, setBodyFilter] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minMiles, setMinMiles] = useState("");
    const [maxMiles, setMaxMiles] = useState("");
    const [sort, setSort] = useState("relevance");
    const [text, setText] = useState("");

    function runSearch(q) {
        setQuery(q);
        setListings(makeListings(q));
        setBodyFilter("All");
        setMinPrice(""); setMaxPrice(""); setMinMiles(""); setMaxMiles("");
        setSort("relevance");
        setText("");
    }

    const filtered = useMemo(() => {
        let arr = [...listings];

        if (text.trim()) {
            const t = text.trim().toLowerCase();
            arr = arr.filter((x) =>
                `${x.year} ${x.make} ${x.model} ${x.body} ${x.location}`.toLowerCase().includes(t)
            );
        }

        if (bodyFilter !== "All") arr = arr.filter((x) => x.body === bodyFilter);

        const minP = minPrice === "" ? null : Number(minPrice);
        const maxP = maxPrice === "" ? null : Number(maxPrice);
        const minM = minMiles === "" ? null : Number(minMiles);
        const maxM = maxMiles === "" ? null : Number(maxMiles);

        if (minP != null) arr = arr.filter((x) => x.price >= minP);
        if (maxP != null) arr = arr.filter((x) => x.price <= maxP);
        if (minM != null) arr = arr.filter((x) => x.mileage >= minM);
        if (maxM != null) arr = arr.filter((x) => x.mileage <= maxM);

        if (sort === "priceLow") arr.sort((a, b) => a.price - b.price);
        if (sort === "priceHigh") arr.sort((a, b) => b.price - a.price);
        if (sort === "milesLow") arr.sort((a, b) => a.mileage - b.mileage);

        return arr;
    }, [listings, bodyFilter, minPrice, maxPrice, minMiles, maxMiles, sort, text]);

    return (
        <div className="container">
            <div className="hero">
                <h1>Shop Cars</h1>
                <p>Browse listings like a real store — filter, sort, and open product pages.</p>
                <div className="hero-actions row">
                    <span className="pill active">New arrivals</span>
                    <span className="pill">Best deals</span>
                    <span className="pill">Low mileage</span>
                </div>
            </div>

            {/* Make/Year/Model selector */}
            <div style={{ marginTop: 14 }}>
                <Filters onSearch={runSearch} />
            </div>

            <div className="store">
                {/* Sidebar */}
                <aside className="card sidebar">
                    <h3 className="title">Filters</h3>

                    <div className="section">
                        <label>Body type</label>
                        <div className="pills">
                            {["All", "Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Wagon"].map((b) => (
                                <button
                                    key={b}
                                    className={`pill ${bodyFilter === b ? "active" : ""}`}
                                    onClick={() => setBodyFilter(b)}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="section">
                        <label>Price</label>
                        <div className="range">
                            <input className="input" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                            <input className="input" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        </div>
                    </div>

                    <div className="section">
                        <label>Mileage</label>
                        <div className="range">
                            <input className="input" placeholder="Min" value={minMiles} onChange={(e) => setMinMiles(e.target.value)} />
                            <input className="input" placeholder="Max" value={maxMiles} onChange={(e) => setMaxMiles(e.target.value)} />
                        </div>
                    </div>

                    <div className="section">
                        <button className="btn" onClick={() => {
                            setBodyFilter("All");
                            setMinPrice(""); setMaxPrice("");
                            setMinMiles(""); setMaxMiles("");
                            setSort("relevance");
                            setText("");
                        }}>
                            Clear filters
                        </button>
                    </div>
                </aside>

                {/* Main */}
                <main>
                    <div className="toolbar">
                        <div className="search">
                            <input
                                className="input"
                                placeholder="Search in results (make, model, city...)"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="relevance">Sort: Relevance</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to Low</option>
                                <option value="milesLow">Mileage: Low to High</option>
                            </select>
                        </div>

                        <div className="kpi">
                            {filtered.length} results {query.make ? `• ${query.year} ${query.make} ${query.model}` : ""}
                        </div>
                    </div>

                    <div className="products">
                        {filtered.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>

                    {!query.make && (
                        <p className="muted" style={{ marginTop: 12 }}>
                            Pick a make/year/model above to generate listings.
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
}