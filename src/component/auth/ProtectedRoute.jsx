import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import AuthContext from "../../Context/AuthProvider"

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext)

  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
