import { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../Context/AuthProvider"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
        username,
        password: pwd,
      })
      const accessToken = response?.data?.accessToken
      const id = response?.data?.id
      setAuth({ username, accessToken, id })
      setUsername("")
      setPwd("")
      localStorage.setItem("accessToken", accessToken)
      navigate("/admin")
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current.focus()
    }
  }

  return (
    <main className="login_page">
      <div className="login">
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
          <button>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login
