import { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../Context/AuthProvider"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [username, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/auth/login", {
        username: username.toLowerCase(),
        password: pwd,
      })
      console.log(response.data)
      const accessToken = response?.data?.accessToken
      console.log(accessToken)
      const id = response?.data?.id
      localStorage.setItem("accessToken", accessToken)
      setAuth({ data: { username, id }, error: null, loading: false })
      navigate("/admin")
      setUsername("")
      setPwd("")
    } catch (err) {
      if (err.response?.status === 500) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 429) {
        setErrMsg("Too many login attempts. Please try again in 1 minute.")
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current.focus()
    }
  }

  return (
    <main className="login_page">
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className="login"
      >
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="font-black text-black">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <label htmlFor="pwd">Password: </label>
          <input
            type="password"
            id="pwd"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button className="bg-gray-100 hover:bg-gray-300 border-2 border-black">
            Login
          </button>
        </form>
      </motion.div>
    </main>
  )
}

export default Login
