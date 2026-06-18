/*
PURPOSE: Displays the last 5 searched cities as quick-select buttons.
*/

export default function SearchHistory({ history, onSelect, dark }) {
    if (!history.length) return null

    const labelClass = dark ? "text-xs text-white/40 mb-1" : "text-xs text-gray-600 mb-1"
    const btnClass = dark
        ? "text-sm px-3 py-1 rounded-full border border-white/30 text-white/80 hover:border-white hover:text-white transition"
        : "text-sm px-3 py-1 rounded-full border border-gray-400 hover:border-blue-600 hover:text-blue-600 transition"

    return (
        <div className="px-4 pb-2">
            <p className={labelClass}>Recent searches</p>
            <div className="flex gap-2 flex-wrap">
                {history.map((query, i) => (
                    <button
                        key={i}
                        onClick={() => onSelect(query)}
                        className={btnClass}
                    >
                        {query}
                    </button>
                ))}
            </div>
        </div>
    )
}
