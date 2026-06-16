/*
PURPOSE: Displays the last 5 searched cities as quick-select buttons.
*/

export default function SearchHistory({ history, onSelect }) {
    if (!history.length) return null

    return (
        <div className="px-4 pb-2">
            <p className="text-xs text-gray-400 mb-1">Recent searches</p>
            <div className="flex gap-2 flex-wrap">
                {history.map((query, i) => (
                    <button
                        key={i}
                        onClick={() => onSelect(query)}
                        className="text-sm px-3 py-1 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition"
                    >
                        {query}
                    </button>
                ))}
            </div>
        </div>
    )
}
