import axios from "axios"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../Context/AuthProvider"

const AdminDash = () => {
  const { auth } = useContext(AuthContext)
  const [listings, setListings] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)

  const [updatedListing, setUpdatedListing] = useState({
    image: "",
    title: "",
    location: "",
    condition: "",
    rental: 0,
    desc: "",
    cuisine: [],
  })
  const navigate = useNavigate()

  const fetchAllListings = async () => {
    const response = await axios.get("/api/listings/all")
    const allListings = response.data

    const ownListings = allListings.filter(
      (listing) => listing.user._id === auth.id
    )
    setListings(ownListings)
  }

  useEffect(() => {
    fetchAllListings()
  }, [])

  const handleSave = async (e, id) => {
    e.preventDefault()
    const response = await axios.put(`/api/listings/${id}`)
    console.log(response.data)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setIsDisabled(!isDisabled)
  }

  return (
    <>
      <button onClick={() => navigate("/admin/create")}>Add Listing</button>

      {listings &&
        listings.map((listing) => (
          <form key={listing._id} className="container" onSubmit={handleSave}>
            <div
              className="card-image"
              style={{
                backgroundImage: `url(${listing.image})`,
              }}
              value={listing.image}
            />

            <label htmlFor="title">Title: </label>
            <input
              className="card-title"
              id="title"
              value={listing.title}
              disabled={isDisabled}
            />

            <label htmlFor="location">Location: </label>
            <input
              id="location"
              className="card-subtitle"
              value={listing.location}
              disabled={isDisabled}
            />

            <label htmlFor="condition">Condition: </label>
            <input
              id="condition"
              className="card-subtitle"
              value={listing.condition}
              disabled={isDisabled}
            />

            <label htmlFor="rental">Rental: </label>
            <input
              className="card-subtitle"
              id="rental"
              value={listing.rental}
              disabled={isDisabled}
            />

            <label htmlFor="desc">Description: </label>
            <input
              className="card-subtitle"
              value={listing.desc}
              id="desc"
              disabled={isDisabled}
            />

            <label htmlFor="cuisine">Cuisine: </label>
            <input
              className="card-subtitle"
              value={listing.cuisine}
              disabled={isDisabled}
            />

            {isDisabled ? (
              <button onClick={(e) => handleEdit(e)}>Edit</button>
            ) : (
              <button onClick={(e) => handleSave(e, listing._id)}>
                Save Changes
              </button>
            )}
          </form>
        ))}
    </>
  )
}

export default AdminDash
