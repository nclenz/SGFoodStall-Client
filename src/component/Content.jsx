import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchFilterBars/SearchBar"
import PublicNoListing from "./PublicNoListing"
import { motion } from "framer-motion"
import SkeletonCard from "./skeleton/SkeletonCard"
import RentalFilter from "./SearchFilterBars/RentalFilter"
import LocationFilter from "./SearchFilterBars/LocationFilter"

const Content = () => {
  const [listings, setListings] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [rentalRange, setRentalRange] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchAllListings = async () => {
    const response = await axios.get("/api/listings/all")
    setListings(response.data)
    setSearchResult(response.data)
    setIsLoading(false)
  }

  //Fetch all listings on mount
  useEffect(() => {
    fetchAllListings()
  }, [])

  //Loading page before data return
  if (isLoading) return <SkeletonCard />

  return (
    <div className="bg-slate-50 ">
      <span className="flex items-center justify-center mt-20">
        <RentalFilter
          setSearchResult={setSearchResult}
          rentalRange={rentalRange}
          setRentalRange={setRentalRange}
          listings={listings}
        />

        <SearchBar setSearchResult={setSearchResult} listings={listings} />

        <LocationFilter listings={listings} setSearchResult={setSearchResult} />
      </span>

      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 ">
          {searchResult?.length ? (
            searchResult.map((listing) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
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

                    <p>Posted by {listing.user?.username}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <PublicNoListing />
          )}
        </div>
      </div>
    </div>
  )
}

export default Content
