import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

const Content = () => {
  const [listings, setListings] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [rentalRange, setRentalRange] = useState("")
  const navigate = useNavigate()

  const fetchAllListings = async () => {
    const response = await axios.get("/api/listings/all")
    setListings(response.data)
    setSearchResult(response.data)
  }

  useEffect(() => {
    fetchAllListings()
  }, [])

  const handleRentalRangeChange = (e) => {
    setSearchResult(
      listings.filter((listing) => {
        switch (e.target.value) {
          case "below2k":
            return listing.rental < 2000
          case "2k-5k":
            return listing.rental >= 2000 && listing.rental < 5000
          case "5k-10k":
            return listing.rental >= 5000 && listing.rental < 10000
          case "moreThan10k":
            return listing.rental >= 10000
          default:
            return true
        }
      })
    )
    setRentalRange(e.target.value)
  }

  return (
    <div className="bg-slate-50">
      <SearchBar setSearchResult={setSearchResult} listings={listings} />
      <div className="flex justify- mb-6">
        <label htmlFor="filterRent" className="block m-2">
          Filter by Rent
        </label>
        <select
          value={rentalRange}
          id="filterRent"
          onChange={handleRentalRangeChange}
          className="form-select block w-full sm:w-auto border"
        >
          <option value="">All</option>
          <option value="below2k">Below $2,000</option>
          <option value="2k-5k">$2,000 - $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="moreThan10k">More than $10,000</option>
        </select>
      </div>

      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 ">
          {listings.length &&
            searchResult.map((listing) => (
              <div
                key={listing._id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white  cursor-pointer"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                  <img
                    src={listing.image}
                    alt="image"
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-m font-medium text-gray-900">
                    <a onClick={() => navigate(`/listing/${listing._id}`)}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {listing.title}
                    </a>
                  </h3>
                  <p className="text-m text-gray-500">{listing.location}</p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-m  text-gray-500">{listing.desc}</p>
                    <p className="text-base font-medium text-gray-900">
                      ${listing.rental} /Month
                    </p>

                    <p>Posted by {listing.user.username}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Content
