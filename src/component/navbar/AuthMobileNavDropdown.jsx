import React, { lazy, useContext } from "react"
import { Disclosure } from "@headlessui/react"
import AuthContext from "../../Context/AuthProvider"
import { useNavigate } from "react-router-dom"

const AuthMobileNavDropdown = () => {
  const navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setAuth({ data: {}, error: null, loading: false })
    alert("Logged out")
    navigate("/")
  }

  return (
    <>
      <Disclosure.Button
        as="a"
        href="#"
        onClick={() => navigate("/admin/changepwd")}
        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      >
        Change Password
      </Disclosure.Button>
      <Disclosure.Button
        as="a"
        href="#"
        onClick={() => handleLogout()}
        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      >
        Sign out
      </Disclosure.Button>
    </>
  )
}

export default AuthMobileNavDropdown
