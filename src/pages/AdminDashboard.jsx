import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import AuthContext from "../Context/AuthProvider"

const AdminDashboard = () => {
  const [enquiryForm, setEnquiryForm] = useState({})
  const { auth } = useContext(AuthContext)

  const fetchOwnListings = async () => {
    const response = await axios.get("/api/enquiry/all")
    const allEnquiries = response.data
    // console.log(allEnquiries)
    // console.log(auth.id)

    const ownEnquiries = allEnquiries.filter(
      (enquiry) => enquiry.id.user === auth.id
    )
    setEnquiryForm(ownEnquiries)
    console.log(ownEnquiries)
  }

  useEffect(() => {
    fetchOwnListings()
  }, [])
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl mt-8 font-semibold text-gray-900">
              Enquiries
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        email
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {enquiryForm?.length &&
                      enquiryForm.map((enquiry) => (
                        <tr key={enquiry._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {enquiry.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full font-medium text-gray-900">
                              {enquiry.email ? enquiry.email : null}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="font-medium text-gray-900">
                              {enquiry.mobile}
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                            <div className="font-medium text-gray-900">
                              {enquiry.msg ? enquiry.msg : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
