import React from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import AuthContext from "../Context/AuthProvider"

const Navbar = () => {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div className="nav">
      <Link to="/">SG Food Stall</Link>

      {auth.accessToken ? (
        <button onClick={() => navigate("/login")}>Log Out</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  )
}

export default Navbar
