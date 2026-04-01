/*
  GameDetail.jsx
  Displays the full stats for a single game fetched from Firebase Firestore.
  Allows the user to edit any field and save the changes back to Firebase.
  Also allows the user to delete the game entirely.
  Uses React Router's useParams hook to get the game ID from the URL.
*/

import { useState, useEffect } from "react"
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate, useParams } from "react-router-dom"



function GameDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [editData, setEditData] = useState({})

    useEffect(() => {
        async function fetchGame() {
            try {
                const docRef = doc(db, 'games', id)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setGame({ id: docSnap.id, ...docSnap.data()})
                    setEditData({ id: docSnap.id, ...docSnap.data()})
                }
            } catch (error) {
                console.log('Error fetching game:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchGame()
    }, [id])

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this game?')) {
            await deleteDoc(doc(db, 'games', id))
            navigate('/archives')
        }
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditData({ ...editData, [name]: value })
    }

    const handleEditSave = async () => {
        await updateDoc(doc(db, 'games', id), {
            opponent: editData.opponent,
            date: editData.date,
            seasonOrTournament: editData.seasonOrTournament,
            type: editData.type,
            goalsSaved: Number(editData.goalsSaved),
            goalsAllowed: Number(editData.goalsAllowed),
            goalKicks: Number(editData.goalKicks),
            punts: Number(editData.punts),
            passBacks: Number(editData.passBacks),
            cleanSheet: Number(editData.goalsAllowed) === 0,
        })
        setGame({ ...editData, cleanSheet: Number(editData.goalsAllowed) === 0 })
        setEditing(false)
    }

    if (loading) return <div className="min-h-screen bg-green-900 flex items-center justify-center">
        <p className="text-white">Loading...</p></div>
    if (!game) return <div className="min-h-screen bg-green-900 flex items-center justify-center">
        <p className="text-white">Game not found</p></div>

    return (
        <div className="min-h-screen bg-green-900 p-6">
            <button
                onClick={() => navigate('/archives')}
                className="text-green-300 mb-6 text-sm">
                ← Back
            </button>

            {!editing ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-white text-3xl font-bold">vs {game.opponent}</h1>
                        {game.cleanSheet && <span className="text-yellow-400 font-bold">✨ Clean Sheet</span>}
                    </div>

                    <p className="text-green-300 mb-1">{game.date}</p>
                    <p className="text-green-300 mb-6 capitalize">{game.type} : {game.seasonOrTournament}</p>
                
                    <div className="flex flex-col gap-4">
                        {[
                            { label: '🧤 Goals Saved', value: game.goalsSaved },
                            { label: '⚽ Goals Allowed', value: game.goalsAllowed },
                            { label: '👟 Goal Kicks', value: game.goalKicks },
                            { label: '🦵 Punts', value: game.punts },
                            { label: '↩️ Pass Backs', value: game.passBacks },
                        ].map(({ label, value}) => (
                            <div key={label} className="flex justify-between bg-green-800 p-4 rounded-2xl">
                                <span className="text-white">{label}</span>
                                <span className="text-white font-bold">{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={() => setEditing(true)}
                            className="flex-1 bg-white text-green-900 font-bold py-4 rounded-2xl">
                                ✏️ Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-500 text-white font-bold py-4 rounded-2xl">
                                🗑️ Delete
                        </button>
                    </div>
                </>

            ) : (
                <>
                    <h1 className="text-white text-3xl font-bold mb-6">✏️ Edit Game</h1>
                    <div className="flex flex-col gap-4">
                        <input type="date" name="date" value={editData.date} onChange={handleEditChange} placeholder="Opponent" className="p-3 rounded-xl bg-green-800 text-white" />
                        <input type="text" name="opponent" value={editData.opponent} onChange={handleEditChange} placeholder="Opponent" className="p-3 rounded-xl bg-green-800 text-white" />
                        <select name="type" value={editData.type} onChange={handleEditChange} className="p-3 rounded-xl bg-green-800 text-white">
                            <option value="season">Season</option>
                            <option value="tournament">Tournament</option>
                        </select>
                        <input type="text" name="seasonOrTournament" value={editData.seasonOrTournament} onChange={handleEditChange} placeholder="Season or Tournament name" className="p-3 rounded-xl bg-green-800 text-white" />
                        {[
                            { label: '🧤 Goals Saved', name: 'goalsSaved' },
                            { label: '⚽ Goals Allowed', name: 'goalsAllowed' },
                            { label: '👟 Goal Kicks', name: 'goalKicks' },
                            { label: '🦵 Punts', name: 'punts' },
                            { label: '↩️ Pass Backs', name: 'passBacks'},
                        ].map(({ label, name }) => (
                            <div key={name} className="flex items-center justify-between bg-green-800 p-3 rounded-xl">
                                <label className="text-white">{label}</label>
                                <input type="number" name={name} value={editData[name]} onChange={handleEditChange} min="0" style={{ color: 'black' }} className="w-20 p-2 rounded-lg bg-700 text-white text-center" />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button onClick={handleEditSave} className="flex-1 bg-white text-green-900 font-bold py-4 rounded-2xl">💾 Save</button>
                        <button onClick={() => setEditing(false)} className="flex-1 bg-green-700 text-white font-bold py-4 rounded-2xl">Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default GameDetail