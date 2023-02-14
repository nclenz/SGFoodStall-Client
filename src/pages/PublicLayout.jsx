import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../component/navbar/Navbar"

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default PublicLayout
