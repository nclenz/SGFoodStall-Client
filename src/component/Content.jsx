import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

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
    navigate(`/listing/${id}`)
  }

  return (
    <>
      <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-center my-5 ">
        <div className="w-full max-w-lg lg:max-w-xs ">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <SearchBar setSearchResult={setSearchResult} listings={listings} />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {listings.length &&
              searchResult.map((listing) => (
                <div
                  key={listing._id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                      src={listing.image}
                      alt="image"
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a onClick={() => handleClick(listing._id)}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {listing.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500">{listing.location}</p>
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="text-sm italic text-gray-500">
                        {listing.desc}
                      </p>
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

      {/* <div className="image-grid">
        {listings.length &&
          searchResult.map((listing) => (
            <div>
              <div
                key={listing._id}
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
                  Rental: ${listing.rental}/month{" "}
                  {listing.negotiable ? "Negotiable" : null}
                </h3>
                <p>Posted by {listing.user.username}</p>
              </div>
            </div>
          ))}
      </div> */}
    </>
  )
}

export default Content
