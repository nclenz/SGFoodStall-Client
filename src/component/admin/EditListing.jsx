import axios from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"
import { useNavigate, useParams } from "react-router-dom"
import districtData from "../../data/districtData"
import cuisineOptions from "../../data/cuisineOptions"

const EditListing = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([])
  const [selectedListing, setSelectedListing] = useState([])

  const [updatedListing, setUpdatedListing] = useState({
    image: selectedListing,
    title: "",
    location: "",
    condition: "Bare",
    rental: 0,
    desc: "",
    cuisine: [],
  })
  const navigate = useNavigate()
  const { id } = useParams()

  const fetchSelectedListing = async () => {
    const response = await axios.get(`/api/listings/listing/${id}`)
    setSelectedListing(response.data)
    setUpdatedListing(response.data)
  }

  useEffect(() => {
    fetchSelectedListing()
  }, [])

  const handleDelete = async () => {
    await axios.delete(`/api/listings/delete/${id}`)
    alert("Listing Deleted")
    navigate("/admin")
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`/api/listings/edit/${id}`, updatedListing)
    alert("Listing Updated")
    navigate("/admin")
  }

  return (
    <>
      <div className="mt-20 ml-10 sm:mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Edit Listing
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="off"
                        defaultValue={selectedListing.title}
                        onChange={(e) =>
                          setUpdatedListing({
                            ...updatedListing,
                            title: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="location"
                        className="block text-lg font-medium text-gray-700 "
                      >
                        Location:{" "}
                      </label>
                      <select
                        className="border border-gray-300 text-medium rounded"
                        id="location"
                        required
                        defaultValue={selectedListing.location}
                        onChange={(e) =>
                          setUpdatedListing({
                            ...updatedListing,
                            location: e.target.value,
                          })
                        }
                      >
                        <option value="">Select location</option>
                        {Object.keys(districtData).map((districtCode) => (
                          <option
                            key={districtCode}
                            value={districtData[districtCode].join(", ")}
                          >
                            {districtData[districtCode].join(", ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="rental"
                        className="block text-lg font-medium text-gray-700 "
                      >
                        Rental:
                      </label>
                      <input
                        type="number"
                        name="rental"
                        id="rental"
                        autoComplete="off"
                        defaultValue={selectedListing.rental}
                        onChange={(e) =>
                          setUpdatedListing({
                            ...updatedListing,
                            rental: e.target.value,
                          })
                        }
                        className="mt-1 block w-60 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="cuisine"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cuisine
                      </label>
                      <Select
                        isMulti
                        options={cuisineOptions}
                        value={selectedCuisines.map((value) => ({ value }))}
                        onChange={(selectedOption) => {
                          setSelectedCuisines(
                            selectedOption.map((option) => option.value)
                          )
                          setUpdatedListing({
                            ...updatedListing,
                            cuisine: selectedOption.map(
                              (option) => option.value
                            ),
                          })
                        }}
                        getOptionLabel={(option) => option.value}
                        getOptionValue={(option) => option.value}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="desc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description:
                      </label>
                      <textarea
                        type="text"
                        name="desc"
                        id="desc"
                        autoComplete="off"
                        defaultValue={selectedListing.desc}
                        onChange={(e) =>
                          setUpdatedListing({
                            ...updatedListing,
                            desc: e.target.value,
                          })
                        }
                        className="mt-1 block w-80 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="condition:"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Condition::
                      </label>
                      <select
                        id="condition"
                        name="condition"
                        autoComplete="off"
                        defaultValue={updatedListing.condition}
                        onChange={(e) =>
                          setUpdatedListing({
                            ...updatedListing,
                            condition: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Bare">Bare</option>
                        <option value="Partial Furnish">Partial Furnish</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                      </select>
                      <button
                        type="submit"
                        className="inline-flex justify-center m-10  rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-10 ml-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Delete Listing
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This action cannot be undone. This will permanently delete the
                listing
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <button
              onClick={() => handleDelete()}
              className="inline-flex justify-center rounded-md mb-20 border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditListing
