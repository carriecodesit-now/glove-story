/*
  GameArchives.jsx
  Displays a list of all saved games fetched from Firebase Firestore.
  Shows opponent, date, season or tournament, saves, goals allowed, pass backs
  and clean sheet status for each game.
  Users can click any game to view its full details.
*/

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'


function GameArchives() {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGames() {
            try {
                const querySnapshot = await getDocs(collection(db, 'games'))
                const fetchedGames = []
                querySnapshot.forEach((doc) => {
                    fetchedGames.push({ id: doc.id, ...doc.data() })
                })
                setGames(fetchedGames)
            } catch (error) {
                console.error('Error fetching games:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchGames()
    }, [])

    return ( 
        <div className="min-h-screen bg-green-900 p-6">
            <button
                onClick={() => navigate('/')}
                className="text-green-300 mb-6 text-sm">
                ← Back
            </button>
            <h1 className="text-white text-3xl font-bold mb-6">📋 Game Archives</h1>

            {loading && <p className="text-green-300">Loading games...</p>}

            {!loading && games.length === 0 && (
                <p className="text-green-300">No games saved yet!</p>
            )}

            <div className="flex flex-col gap-4">
                {games.map((game) => (
                    <div 
                        key={game.id}
                        onClick={() => navigate(`/game/${game.id}`)}
                        className="bg-green-800 p-4 rounded-2xl cursor-pointer hover:bg-green-700">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-white font-bold text-lg">vs {game.opponent}</p>
                                <p className="text-green-300 text-sm">{game.date} : {game.seasonOrTournament}</p>
                                <p className="text-green-300 text-sm capitalize">{game.type}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold">{game.goalsSaved} saves</p>
                                <p className="text-green-300 text-sm">{game.goalsAllowed} allowed</p>
                                {game.cleanSheet === true && (
                                    <span className="text-yellow-400 text-xs font-bold">✨ Clean Sheet</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameArchives