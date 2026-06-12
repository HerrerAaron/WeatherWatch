/* 
PURPOSE: A search bar so the user can check the weather in cities of their choice.
*/

import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [city, setCity] = useState("") // initial value of state is blank empty string

    // check if city matches city inputted by user
    function handleSearch() {
        console.log("Searching for:", city) // for debugging
        if (city.trim() === "") { // if city is not nothing, call onSearch with inputted city
            return 
        }
        onSearch(city)
    }


    return (
        <div className="flex gap-2 p-4">
            <input
                type="text"
                placeholder="Enter a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
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