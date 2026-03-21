/*
  Router.jsx
  Defines all the routes for Glove Story.
  Maps each URL path to its corresponding page component.
  Uses React Router v6 (Routes and Route components).
*/

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LiveTracker from './pages/LiveTracker'
import AddGame from './pages/AddGame'
import GameArchives from './pages/GameArchives'
import GameDetail from './pages/GameDetail'
import Stats from './pages/Stats.jsx'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/live" element={<LiveTracker />} />
      <Route path="/add" element={<AddGame />} />
      <Route path="/archives" element={<GameArchives />} />
      <Route path="/game/:id" element={<GameDetail />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  )
}

export default Router