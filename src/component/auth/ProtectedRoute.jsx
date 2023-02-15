import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import AuthContext from "../../Context/AuthProvider"
import SkeletonCard from "../skeleton/SkeletonCard"

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext)

  console.log(auth)

  if (auth.loading) {
    return <SkeletonCard />
  }

  return auth?.data?.username ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
