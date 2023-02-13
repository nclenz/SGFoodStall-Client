import axios from "axios"
import { createContext, useState, useEffect } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ data: null, error: null, loading: true })

  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  }

  const fetchAuthUser = async () => {
    try {
      const response = await axios.get("/api/auth/user")

      console.log(response.data)
      if (response.data.data.username) {
        setAuth({
          data: {
            id: response.data.data.id,
            username: response.data.data.username,
          },
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      console.log(error.message)
      return setAuth({
        data: null,
        error: error.response.data.error,
        loading: false,
      })
    }
  }

  useEffect(() => {
    if (accessToken) {
      fetchAuthUser()
    } else {
      console.log("No token")
      setAuth({
        data: null,
        loading: false,
        error: null,
      })
    }
  }, [])

  // console.log(auth)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
