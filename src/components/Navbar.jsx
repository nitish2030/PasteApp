import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="flex items-center  h-15 gap-5 bg-slate-900">
    <NavLink to="/" className="text-white p-5">
      Home
    </NavLink>
    <NavLink to="/pastes" className="text-white">
      Pastes
    </NavLink>
  </div>
  )
}

export default Navbar
