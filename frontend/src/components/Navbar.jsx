/* 
PURPOSE: A navigation bar to display the name of the website/project
and other options. For now it will just show "Weather Dashboard"
*/
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <img src="/sun.png" alt="logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-wide">WeatherWatch</h1>
      </div>
      <p className="text-sm text-blue-200">Powered by OpenWeather</p>
    </nav>
  )
}
