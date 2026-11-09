import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './lib/api.js'
import './App.css'

const navigation = [
  { label: 'Users', to: '/users' },
  { label: 'Teams', to: '/teams' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/users">
            <img src={logo} alt="" className="app-logo" />
            <span>Octofit Tracker</span>
          </NavLink>
          <nav className="nav nav-pills flex-wrap" aria-label="Main navigation">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <div className="mb-4">
          <p className="text-uppercase text-primary fw-semibold small mb-1">
            Your fitness community
          </p>
          <h1 className="h2 mb-2">Octofit Tracker</h1>
          <p className="text-secondary mb-0">
            Track progress, celebrate consistency, and reach your goals together.
          </p>
        </div>
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p className="alert alert-warning">Page not found.</p>} />
        </Routes>
        <footer className="border-top mt-5 pt-3 text-secondary small">
          API: <code>{API_BASE_URL}</code>
        </footer>
      </main>
    </div>
  )
}

export default App
