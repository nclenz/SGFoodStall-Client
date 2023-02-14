import React, { Fragment, lazy, useContext } from "react"
import { Menu, Transition } from "@headlessui/react"
import AuthContext from "../../Context/AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const AuthNavDropdown = () => {
  const { setAuth, auth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setAuth({ data: {}, error: null, loading: false })
    alert("Logged out")
    navigate("/")
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  return (
    <>
      <Menu as="div" className="relative ml-4 flex-shrink-0">
        <div>
          <Menu.Button className="flex rounded-sm bg-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="sr-only">Open user menu</span>
            <h3 className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ">
              Hi {auth.data.username} !
            </h3>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/admin"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Manage Listing
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/admin/dash"
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => navigate("/admin/changepwd")}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Change Password
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleLogout()}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Log Out
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default AuthNavDropdown
