import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../Context/AuthProvider"

const Logout = () => {
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
    setAuth({})
    navigate("/")
  }

  return (
    <a
      className="block px-4 py-2 text-sm text-gray-700"
      onClick={() => handleLogOut()}
    >
      Sign Out
    </a>
  )
}

export default Logout
