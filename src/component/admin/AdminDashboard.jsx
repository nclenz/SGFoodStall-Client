import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import NoEnquiry from "./NoEnquiry"
import AuthContext from "../../Context/AuthProvider"

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext)
  const [enquiryForm, setEnquiryForm] = useState({})

  const fetchOwnListings = async () => {
    const response = await axios.get("/api/enquiry/all")
    const allEnquiries = response.data
    console.log(allEnquiries)
    const ownEnquiries = allEnquiries.filter(
      (enquiry) => enquiry.id.user === auth.data.id
    )
    setEnquiryForm(ownEnquiries)
    console.log(ownEnquiries)
  }

  useEffect(() => {
    fetchOwnListings()
  }, [])

  const ENQUIRY_STATUS = [
    "Open",
    "Uncontactable",
    "Failed",
    "Following",
    "Pending Viewing",
    "Viewing Done",
    "Deposit Collected",
    "Completed",
  ]
  return (
    <>
      {enquiryForm.length ? (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl mt-8 font-semibold text-gray-900">
                Leads
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
                          Listing
                        </th>
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
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Status
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
                                  <div className="font-medium text-gray-900 underline">
                                    <a href={`/listing/${enquiry.id._id}`}>
                                      {enquiry.id.title}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
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
                                {enquiry.msg}
                              </div>
                            </td>
                            <span>
                              <td className="relative flex justify-center  whitespace-nowrap py-4 pl-3 text-center text-sm font-medium sm:pr-6">
                                <select
                                  value={enquiry.status}
                                  onChange={(event) => {
                                    const updatedEnquiry = {
                                      ...enquiry,
                                      status: event.target.value,
                                    }
                                    setEnquiryForm(
                                      enquiryForm.map((e) =>
                                        e._id === updatedEnquiry._id
                                          ? updatedEnquiry
                                          : e
                                      )
                                    )
                                  }}
                                >
                                  {ENQUIRY_STATUS.map((status, index) => (
                                    <option key={index}>{status}</option>
                                  ))}
                                </select>
                              </td>
                            </span>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoEnquiry />
      )}
    </>
  )
}

export default AdminDashboard
