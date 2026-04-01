/*
  Stats.jsx
  Displays game stats grouped by season or tournament name.
  Fetches all games from Firebase Firestore and calculates totals
  including goals saved, goals allowed, goal kicks, punts, and clean sheets.
  Users can filter by All, Season, or Tournament using the filter buttons.
*/

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'


function Stats() {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

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

    const filteredGames = filter === 'all' ? games : games.filter(g => g.type === filter)

    const grouped = filteredGames.reduce((acc, game) => {
        const key = game.seasonOrTournament || 'Unknown'
        if (!acc[key]) acc[key] = []
        acc[key].push(game)
        return acc
    }, {})

    const getTotals = (games) => ({
        games: games.length,
        goalsSaved: games.reduce((sum, g) => sum + Number(g.goalsSaved || 0), 0),
        goalsAllowed: games.reduce((sum, g) => sum + Number(g.goalsAllowed || 0), 0),
        goalKicks: games.reduce((sum, g) => sum + Number(g.goalKicks || 0), 0),
        punts: games.reduce((sum, g) => sum + Number(g.punts || 0), 0),
        passBacks: games.reduce((sum, g) => sum + Number(g.passBacks || 0), 0),
        cleanSheets: games.filter(g => g.cleanSheet === true).length,
    })

    return (
        <div className="min-h-screen bg-green-900 p-6">
            <button 
                onClick={() => navigate('/')}
                className="text-green-300 mb-6 text-sm">
                ← Back
            </button>
            <h1 className="text-white text-3xl font-bold mb-6">📊 Stats</h1>

            <div className="flex gap-3 mb-6">
                {['all', 'season', 'tournament'].map((f) => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl font-bold capitalize ${
                            filter === f
                            ? 'bg-white text-green-900'
                            : 'bg-green-800 text-white'
                        }`}>
                        {f}
                    </button>
                ))}
            </div>

            {loading && <p className="text-green-300">Loading stats...</p>}

            {!loading && Object.keys(grouped).length === 0 && (
                <p className="text-green-300">No games found!</p>
            )}

            <div className="flex flex-col gap-6">
                {Object.entries(grouped).map(([name, games]) => {
                const totals = getTotals(games)
                    return (
                        <div key={name} className="bg-green-800 p-4 rounded-2xl">
                            <h2 className="text-white text-xl font-bold mb-1">{name}</h2>
                            <p className="text-green-300 text-sm mb-4">{totals.games} game{totals.games !== 1 ? 's' : ''}</p>

                            <div className="flex flex-col gap-2">
                                {[
                                    { label: '🧤 Goals Saved', value: totals.goalsSaved },
                                    { label: '⚽ Goals Allowed', value: totals.goalsAllowed },
                                    { label: '👟 Goal Kicks', value: totals.goalKicks },
                                    { label: '🦵 Punts', value: totals.punts },
                                    { label: '↩️ Pass Backs', value: totals.passBacks },
                                    { label: '✨ Clean Sheets', value: totals.cleanSheets },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between bg-green-700 p-3 rounded-xl">
                                        <span className="text-white">{label}</span>
                                        <span className="text-white font-bold">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Stats