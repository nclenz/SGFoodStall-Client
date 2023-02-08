import axios from "axios"
import { createContext, useState, useEffect } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  }

  const fetchAuthUser = async () => {
    try {
      const response = await axios.get("/api/auth/user")
      console.log(response.data)
      if (response.data.username) {
        setAuth({
          ...auth,
          id: response.data._id,
          username: response.data.username,
        })
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (accessToken) {
      fetchAuthUser()
    } else {
      setAuth({})
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
