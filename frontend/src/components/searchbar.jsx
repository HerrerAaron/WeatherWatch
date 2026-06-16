/* 
PURPOSE: A search bar so the user can check the weather in cities of their choice.
*/

import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("") // initial value of state is blank empty string

    // check if city matches city inputted by user
    function handleSearch() {
        if (query.trim() === "") { // if query is not empty, call onSearch with inputted query
            return
        }
        onSearch(query)
    }

    return (
        <div className="flex gap-2 p-4">
            <input
                type="text"
                placeholder="City, State, Country  (e.g. Springfield, IL, US)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key == "Enter" && handleSearch()}
                className="border rounded p-2 flex-1"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 rounded"
            > search
            </button>
        </div>
    )
}