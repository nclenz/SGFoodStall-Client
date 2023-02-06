import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../Context/AuthProvider"

const Logout = () => {
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
    setAuth({})
    navigate("/")
  }

  return (
    <button class="pure-button" onClick={() => handleLogOut()}>
      Logout
    </button>
  )
}

export default Logout
