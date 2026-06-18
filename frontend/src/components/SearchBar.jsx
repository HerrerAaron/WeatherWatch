/* 
PURPOSE: A search bar so the user can check the weather in cities of their choice.
*/

import { useState } from "react";

export default function SearchBar({ onSearch, onLocationSearch, dark }) {
    const [query, setQuery] = useState("") // initial value of state is blank empty string

    // check if city matches city inputted by user
    function handleSearch() {
        if (query.trim() === "") { // if query is not empty, call onSearch with inputted query
            return
        }
        onSearch(query)
    }

    const inputClass = dark
        ? "border border-white/30 rounded p-2 flex-1 bg-white/10 text-white placeholder-white/50"
        : "border rounded p-2 flex-1"
    const locationBtnClass = dark
        ? "border border-white/50 text-white px-3 rounded hover:bg-white/20 transition"
        : "border border-blue-600 text-blue-600 px-3 rounded hover:bg-blue-300 hover:text-slate-800 transition"

    return (
        <div className="flex gap-2 p-4">
            <input
                type="text"
                placeholder="City, State, Country  (e.g. Springfield, IL, US)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key == "Enter" && handleSearch()}
                className={inputClass}
            />
            <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 rounded"
            >Search
            </button>
            <button
                onClick={onLocationSearch}
                title="Use my location"
                className={locationBtnClass}
            >📍
            </button>
        </div>
    )
}