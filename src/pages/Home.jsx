/*
  Home.jsx
  The landing page of Glove Story.
  Displays the app title and navigation buttons to all main sections
  of the app: Live Tracker, Add Game, Game Archives, and Stats.
*/

import { useNavigate } from "react-router-dom"


function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center">
            <h1 className="text-white text-5xl font-bold mb-2">⚽ Glove Story</h1>
            <p className="text-white300 text-lg mb10">Goalkeeper Stats Tracker</p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <button 
                    onClick={ () => navigate('/live')}
                    className="bg-red-500 hover:bg-red-600 text-white text-xl fold-bold py-5 rounded-2xl shadow-lg">
                    🔴 Live Game Tracker
                </button>
                <button
                    onClick={ () => navigate('/add')}
                    className="bg-white hover:bg-gray-100 text-green-900 text-xl font-bold py-5 rounded-2xl shadow-lg">
                    📝 Add Game Manually
                </button>
                <button
                    onClick={ () => navigate('/archives')}
                    className="bg-white hover:bg-gray-100 text-green-900 text-xl font-bold py-5 rounded-2xl shadow-lg">
                    📋 Game Archives
                </button>
                <button
                    onClick={ () => navigate('/stats')}
                    className="bg-white hover:bg-gray-100 text-green-900 text-xl font-bold py-5 rounded-2xl shadow-lg">
                    📊 Season / Tournament Stats
                </button>

            </div>


        </div>
  )
}

export default Home