/* 
PURPOSE: A navigation bar to display the name of the website/project
        and other options. For now it will just show "Weather Dashboard"
*/
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌤️</span>
        <h1 className="text-xl font-bold tracking-wide">Weather Dashboard</h1>
      </div>
      <p className="text-sm text-blue-200">Powered by OpenWeatherMap</p>
    </nav>
  )
}
