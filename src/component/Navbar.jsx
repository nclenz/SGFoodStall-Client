import React from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import AuthContext from "../Context/AuthProvider"
import Logout from "./Logout"

const Navbar = () => {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div className="nav">
      <Link to="/">SG Food Stall</Link>

      {!auth.accessToken ? (
        <button onClick={() => navigate("/login")}>Login</button>
      ) : (
        <Logout />
      )}

      {auth.accessToken ? (
        <button onClick={() => navigate("/admin")}>Dashboard</button>
      ) : null}
    </div>
  )
}

export default Navbar
