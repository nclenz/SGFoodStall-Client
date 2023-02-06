import { useContext } from "react"
import { useState } from "react"
import AuthContext from "../Context/AuthProvider"
import Select from "react-select"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddListing = () => {
  const { auth } = useContext(AuthContext)
  const [selectedCuisines, setSelectedCuisines] = useState([])
  const [newListing, setNewListing] = useState({
    user: auth.id,
    title: "",
    location: "",
    condition: "Bare",
    rental: 0,
    desc: "",
    cuisine: [],
  })

  const navigate = useNavigate()

  const cuisineOptions = [
    { value: "Thai", label: "Thai" },
    { value: "Chinese", label: "Chinese" },
    { value: "Indian", label: "Indian" },
    { value: "Malay", label: "Malay" },
    { value: "Japanese / Korean", label: "Japanese / Korean" },
    { value: "Seafood", label: "Seafood" },
    { value: "Western", label: "Western" },
    { value: "Economy Rice", label: "Economy Rice" },
    { value: "Dessert / Snack", label: "Dessert / Snack" },
    { value: "Vietnamese", label: "Vietnamese" },
    { value: "Fishball Noodles", label: "Fishball Noodles" },
    {
      value: "Chicken Rice or Roasted Delight",
      label: "Chicken Rice or Roasted Delight",
    },
    { value: "Fish Soup / Ban mian", label: "Fish Soup / Ban mian" },
    {
      value: "Char Kway Tiao / Carrot Cake",
      label: "Char Kway Tiao / Carrot Cake",
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      formData.append("user", auth.id)
      formData.append("title", newListing.title)
      formData.append("location", newListing.location)
      formData.append("condition", newListing.condition)
      formData.append("rental", newListing.rental)
      formData.append("negotiable", newListing.negotiable)
      formData.append("availability", newListing.availability)
      formData.append("cuisine", newListing.cuisine)
      formData.append("desc", newListing.desc)
      formData.append("image", e.target.image.files[0])
      await axios.post("/api/listings/create", formData)
      navigate("/admin")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <main className="add_listing">
      <div className="add_listing_form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="image" className="car-form__label">
            Upload an image:
          </label>
          <input type="file" className="form-control-file" name="image" />
          <label htmlFor="title"> Title: </label>
          <input
            type="text"
            id="title"
            required
            onChange={(e) =>
              setNewListing({ ...newListing, title: e.target.value })
            }
          />
          <label htmlFor="location">Location: </label>
          <input
            autoComplete="off"
            type="text"
            id="location"
            required
            onChange={(e) =>
              setNewListing({ ...newListing, location: e.target.value })
            }
          />
          <label htmlFor="condition">Condition: </label>
          <select
            type="text"
            id="condition"
            required
            onChange={(e) =>
              setNewListing({ ...newListing, condition: e.target.value })
            }
          >
            <option value="Bare">Bare</option>
            <option value="Partial Furnish">Partial Furnish</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
          <label htmlFor="rental">Rental: </label>
          <input
            type="number"
            id="rental"
            required
            onChange={(e) =>
              setNewListing({ ...newListing, rental: e.target.value })
            }
          />
          <span>
            <label>Negotiable: </label>
            <label htmlFor="true">True</label>
            <input
              type="radio"
              id="negotiableTrue"
              value="true"
              onChange={(e) =>
                setNewListing({ ...newListing, negotiable: e.target.value })
              }
            />
            <label htmlFor="false">False</label>
            <input
              type="radio"
              id="false"
              value="false"
              onChange={(e) =>
                setNewListing({ ...newListing, negotiable: e.target.value })
              }
            />
          </span>
          <label htmlFor="availability">Availability: </label>
          <input
            type="text"
            id="availability"
            autoComplete="off"
            required
            onChange={(e) =>
              setNewListing({ ...newListing, availability: e.target.value })
            }
          />
          <div>
            <label>Cuisine:</label>

            <Select
              isMulti
              options={cuisineOptions}
              value={selectedCuisines.map((value) => ({ value }))}
              onChange={(selectedOption) => {
                setSelectedCuisines(
                  selectedOption.map((option) => option.value)
                )
                setNewListing({
                  ...newListing,
                  cuisine: selectedOption.map((option) => option.value),
                })
              }}
              getOptionLabel={(option) => option.value}
              getOptionValue={(option) => option.value}
            />
          </div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            onChange={(e) =>
              setNewListing({ ...newListing, desc: e.target.value })
            }
          />

          <button>Submit</button>
        </form>
      </div>
    </main>
  )
}

export default AddListing
