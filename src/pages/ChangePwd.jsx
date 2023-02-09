import axios from "axios"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../Context/AuthProvider"

const ChangePwd = () => {
  const { auth } = useContext(AuthContext)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put("/api/users/changepwd", {
      id: auth.id,
      oldPassword,
      newPassword,
    })
    alert("Password Updated")
    navigate("/admin")
  }

  return (
    <>
      <div className="changePwd_page">
        <legend className="text-black mb-10 font-bold">Change Password </legend>
        <div className="login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="oldPwd">Old Password: </label>
            <input
              type="password"
              id="oldPwd"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label htmlFor="newPwd">New Password: </label>
            <input
              type="password"
              id="newPwd"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePwd
