import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import NoEnquiry from "./NoEnquiry"
import AuthContext from "../../Context/AuthProvider"
import SkeletonCard from "../skeleton/SkeletonCard"
import EnquiryFormTable from "./EnquiryFormTable"

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext)
  const [enquiryForm, setEnquiryForm] = useState({})
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchOwnListings = async () => {
    const response = await axios.get("/api/enquiry/all")
    const allEnquiries = response.data
    const ownEnquiries = allEnquiries.filter(
      (enquiry) => enquiry.id.user === auth.data.id
    )
    setEnquiryForm(ownEnquiries)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchOwnListings()
  }, [])

  if (isLoading) return <SkeletonCard />

  return (
    <>
      {enquiryForm.length ? (
        <EnquiryFormTable
          enquiryForm={enquiryForm}
          setEnquiryForm={setEnquiryForm}
          setSelectedEnquiryId={setSelectedEnquiryId}
          selectedEnquiryId={selectedEnquiryId}
        />
      ) : (
        <NoEnquiry />
      )}
    </>
  )
}

export default AdminDashboard
