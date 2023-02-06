import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

const Content = () => {
  const [listings, setListings] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [listingID, setListingID] = useState("")
  const navigate = useNavigate()

  const fetchAllListings = async () => {
    const response = await axios.get("/api/listings/all")
    setListings(response.data)
    setSearchResult(response.data)
    console.log(response)
  }

  useEffect(() => {
    fetchAllListings()
  }, [])

  const handleClick = (id) => {
    navigate(`/${id}`)
  }

  return (
    <>
      <SearchBar setSearchResult={setSearchResult} listings={listings} />
      <div className="image-grid">
        {listings.length &&
          searchResult.map((listing) => (
            <div>
              <div
                key={searchResult._id}
                className="container"
                onClick={() => handleClick(listing._id)}
              >
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${listing.image})`,
                  }}
                />

                <h3 className="card-title"> {listing.title}</h3>
                <h3 className="card-subtitle">Location: {listing.location}</h3>

                <h3 className="card-title">
                  Rental: {listing.rental}/month{" "}
                  {listing.negotiable ? "Negotiable" : null}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Content
