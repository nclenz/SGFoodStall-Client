import React from "react"
import { Link } from "react-router-dom"

const NavElements = () => {
  return (
    <>
      <Link
        to="/admin"
        href="#"
        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        Manage Listing
      </Link>
      <Link
        to="/admin/dash"
        href="#"
        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        Dashboard
      </Link>
    </>
  )
}

export default NavElements
