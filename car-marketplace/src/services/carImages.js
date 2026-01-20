export function carImageUrl({ make, model, year, seed = 0 }) {
    // This returns real photos, “car-like”, based on keywords.
    // Not guaranteed exact model match, but it looks legit for a portfolio.
    const q = encodeURIComponent(`${year ?? ""} ${make ?? ""} ${model ?? ""} car`.trim());
    return `https://loremflickr.com/1200/800/${q}?lock=${seed}`;
}