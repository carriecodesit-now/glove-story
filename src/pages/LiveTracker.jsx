/*
  LiveTracker.jsx
  A real-time stat tracker designed for use on the sideline during a game.
  Users enter game info before kickoff, then use large tap-friendly buttons
  to increment and decrement stats as they happen.
  When the game ends, stats are saved to Firebase Firestore.
*/

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'


function LiveTracker() {
    const navigate = useNavigate()
    const [gameInfo, setGameInfo] = useState({
        date: new Date().toISOString().split('T')[0],
        opponent: '',
        type: 'season',
        seasonOrTournament: '',
    })

    const [stats, setStats] = useState({
        goalsSaved: 0,
        goalsAllowed: 0,
        goalKicks: 0,
        punts: 0,
        passBacks: 0,
    })

    const [gameStarted, setGameStarted] = useState(false)
    const [saving, setSaving] = useState(false)

    const increment = (stat) => {
        setStats({ ...stats, [stat]: stats[stat] + 1 })
    }

    const decrement = (stat) => {
        setStats({ ...stats, [stat]: stats[stat] - 1 })
    }

    const handleInfoChange = (e) => {
        setGameInfo({ ...gameInfo, [e.target.name]: e.target.value })
    }

    const handleStartGame = () => {
        if (!gameInfo.opponent || !gameInfo.seasonOrTournament) {
            alert('Please enter opponent and season/tournament name!')
            return
        }
        setGameStarted(true)
    }

    const handleEndGame = async () => {
        if (window.confirm('End game and save stats?')) {
            setSaving(true)
            try {
                await addDoc(collection(db, 'games'), {
                    ...gameInfo,
                    ...stats,
                    cleanSheet: stats.goalsAllowed === 0,
                    createdAt: new Date(),
                })
                navigate('/archives')
            } catch (error) {
                console.error('Error saving game:', error)
                setSaving(false)
            }
        }
        
    }

    if (!gameStarted) {
        return (
            <div className="min-h-screen bg-green-900 p-6">
                <button
                    onClick={() => navigate('/')}
                    className="text-green-300 mb-6 text-sm">
                    ← Back
                </button>
                <h1 className="text-white text-3xl font-bold mb-6">🔴 Live Tracker</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="date"
                        name="date"
                        value={gameInfo.date}
                        className="p-3 rounded-xl bg-green-800 text-white"
                    />
                    <input
                        type="text"
                        name="opponent"
                        value={gameInfo.opponent}
                        onChange={handleInfoChange}
                        placeholder="Opponent name"
                        className="p-3 rounded-xl bg-green-800 text-white placeholder-green-400"
                    />
                    <select
                        name="type"
                        value={gameInfo.type}
                        onChange={handleInfoChange}
                        className="p-3 rounded-xl bg-green-800 text-white">
                        <option value="season">Season</option>
                        <option value="tournament">Tournament</option>
                    </select>
                    <input
                        type="text"
                        name="seasonOrTournament"
                        value={gameInfo.seasonOrTournament}
                        onChange={handleInfoChange}
                        placeholder="Season or Tournament name"
                        className="p-3 rounded-xl bg-green-800 text-white placeholder-green-400"
                    />
                    <button
                        onClick={handleStartGame}
                        className="bg-red-500 text-white font-bold text-xl py-5 rounded-2xl mt-4">
                        🔴 Start Game
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-green-900 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-white text-2xl font-bold">🔴 vs {gameInfo.opponent} </h1>
                <button
                    onClick={() => {
                        if (window.confirm('Cancel game? Stats will not be saved')) {
                            setGameStarted(false)
                            setStats({ goalsSaved: 0, goalsAllowed: 0, goalKicks: 0, punts: 0, passBacks: 0 })
                        }
                    }}
                    className="text-red-400 text-sm font-bold">
                    ✕ Cancel
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {[
                    { label: '🧤 Goals Saved', stat: 'goalsSaved', color: 'bg-blue-600' },
                    { label: '⚽ Goals Allowed', stat: 'goalsAllowed', color: 'bg-red-600' },
                    { label: '👟 Goal Kicks', stat: 'goalKicks', color: 'bg-yellow-600' },
                    { label: '🦵 Punts', stat: 'punts', color: 'bg-purple-600' },
                    { label: '↩️ Pass Backs', stat: 'passBacks', color: 'bg-orange-600'},
                ].map(({ label, stat, color }) => (
                    <div key={stat} className="bg-green-800 p-4 rounded-2xl">
                        <p className="text-white text-lg font-bold mb-3">{label}</p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => decrement(stat)}
                                className="bg-green-700 text-white text-3xl w-16 h-16 rounded-2xl font-bold">
                                -
                            </button>
                            <span className="text-white text-5xl font-bold">{stats[stat]}</span>
                            <button 
                                onClick={() => increment(stat)}
                                className={`${color} text-white text-3xl w-16 rounded-2xl font-bold`}>
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleEndGame}
                disabled={saving}
                className="w-full bg-white text-green-900 font-bold text-xl py-5 rounded-2xl mt-6">
                {saving ? 'Saving...' : '🏁 End Game & Save'}
            </button>
        </div>
    )
}

export default LiveTracker