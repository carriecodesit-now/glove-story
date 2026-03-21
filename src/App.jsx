/*
  App.jsx
  Author: Carrie Furet
  Course: CSE-40591 Front End Development with React
  Date: March 2026

  The root component of Glove Story — a goalkeeper stats tracking app.
  Wraps the entire app in BrowserRouter to enable client-side
  navigation using React Router.
*/

import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App