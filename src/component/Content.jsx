import axios from "axios"
import { useEffect, useState } from "react"

const Content = () => {
  const [listings, setListings] = useState("")

  const fetchAllListings = async () => {
    const response = await axios.get("/api/listings/all")
    setListings(response.data)
    console.log(response)
  }

  useEffect(() => {
    fetchAllListings()
  }, [])

  return (
    <>
      <div className="image-grid">
        {listings.length &&
          listings.map((listing) => (
            <div key={listing._id} className="container">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${listing.image})`,
                }}
              />

              <h3 className="card-title"> {listing.title}</h3>
              <h3 className="card-subtitle">Location: {listing.location}</h3>
              <h3 className="card-title">Rental: {listing.rental}</h3>
            </div>
          ))}
      </div>
    </>
  )
}

export default Content
