/*
  AddGame.jsx
  Allows the user to manually enter stats for a completed game.
  Saves the game data to Firebase Firestore including opponent, date,
  season or tournament, goals saved, Goals Against, goal kicks, punts and pass backs.
  Automatically calculates whether the game was a clean sheet.
*/

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'


function AddGame() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        date: '',
        opponent: '',
        type: 'season',
        seasonOrTournament: '',
        goalsSaved: 0,
        goalsAllowed: 0,
        goalKicks: 0,
        punts: 0,
        passBacks: 0,
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'games'), {
                ...formData,
                goalsSaved: Number(formData.goalsSaved),
                goalsAllowed: Number(formData.goalsAllowed),
                goalKicks: Number(formData.goalKicks),
                punts: Number(formData.punts),
                passBacks: Number(formData.passBacks),
                cleanSheet: Number(formData.goalsAllowed) === 0,
                createdAt: new Date(),
            })
            navigate('/archives')
        }   catch (error) {
            console.error('Error saving game:', error)
        }
    }
    
    return (
        <div className="min-h-screen bg-green-900 p-6">
            <button
                onClick={() => navigate('/')}
                className="text-green-300 mb-6 text-sm">
                ← Back
            </button>
            <h1 className="text-white text-3xl font-bold mb-6">📝 Add Game Manually</h1>
        

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="p-3 rounded-xl bg-green-800 text-white"
                />
                <input
                    type="text"
                    name="opponent"
                    value={formData.opponent}
                    onChange={handleChange}
                    placeholder="Opponent name"
                    required
                    className="p-3 rounded-xl bg-green-800 text-white placeholder-green-400"
                />
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-green-800 text-white">
                    <option value="season">Season</option>
                    <option value="tournament">Tournament</option>
                </select>
                <input  
                    type="text"
                    name="seasonOrTournament"
                    value={formData.seasonOrTournament}
                    onChange={handleChange}
                    placeholder="Season or Tournament name"
                    required
                    className="p-3 rounded-xl bg-green-800 text-white placeholder-green-400"
                />

                {[
                    { label: '🧤 Goals Saved', name: 'goalsSaved'},
                    { label: '⚽ Goals Against', name: 'goalsAllowed' },
                    { label: '👟 Goal Kicks', name: 'goalKicks' },
                    { label: '🦵 Punts', name: 'punts' },
                    { label: '↩️ Pass Backs', name: 'passBacks'},
                ].map(({ label, name}) => (
                    <div key={name} className="flex items-center justify-between bg-green-800 p-3 rounded-xl">
                        <label className="text-white">{label}</label>
                        <input
                            type="number"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            min="0"
                            className="w-20 p-2 rounded-lg bg-green-900 text-white text-center"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-white text-green-900 font-bold text-xl py-4 rounded-2xl mt-4">
                    💾 Save Game
                </button>
            </form>
        </div>
    )
}

export default AddGame