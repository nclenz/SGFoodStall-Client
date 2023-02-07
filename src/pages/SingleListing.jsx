import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EnquiryForm from "../component/EnquiryForm"
import Navbar from "../component/Navbar"

const SingleListing = () => {
  const [listing, setListing] = useState({})

  const { id } = useParams()
  const fetchSelectedListing = async () => {
    const response = await axios.get(`/api/listings/${id}`)
    setListing(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchSelectedListing()
  }, [])

  return (
    <>
      <main className="selected_listing_page">
        <div
          className="single-card-image"
          style={{
            backgroundImage: `url(${listing.image})`,
          }}
        />
        {listing.title}
        {`$ ${listing.rental}`}
        <EnquiryForm />
      </main>
    </>
  )
}

export default SingleListing
