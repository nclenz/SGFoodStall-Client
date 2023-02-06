import React from "react"
import { useNavigate } from "react-router-dom"

const AdminDash = () => {
  const navigate = useNavigate()
  return (
    <>
      <div>AdminDash</div>
      <button onClick={() => navigate("/admin/create")}>Add Listing</button>
    </>
  )
}

export default AdminDash
