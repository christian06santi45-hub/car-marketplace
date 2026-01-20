import { useEffect, useState } from "react";
import { getMakes, getModelsForMakeYear } from "../services";

export function Filters({ onSearch }) {
    const [makes, setMakes] = useState([]);
    const [make, setMake] = useState("");
    const [year, setYear] = useState("");
    const [models, setModels] = useState([]);
    const [model, setModel] = useState("");

    useEffect(() => { getMakes().then(setMakes) }, []);
    useEffect(() => {
        if (make && year) getModelsForMakeYear(make, year).then(setModels);
    }, [make, year]);

    return (
        <div className="card filters">
            <div className="filters-grid">
                <div className="field">
                    <label>Make</label>
                    <select value={make} onChange={(e) => setMake(e.target.value)}>
                        <option value="">Select make</option>
                        {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                <div className="field">
                    <label>Year</label>
                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="">Select year</option>
                        {Array.from({ length: 25 }, (_, i) => String(new Date().getFullYear() - i))
                            .map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>

                <div className="field">
                    <label>Model</label>
                    <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!make || !year}>
                        <option value="">{!make || !year ? "Pick make + year" : "Select model"}</option>
                        {models.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                    <button className="btn primary" onClick={() => onSearch({ make, year, model })}>
                        Search
                    </button>
                </div>
            </div>
        );
    }