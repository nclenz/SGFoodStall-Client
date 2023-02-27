import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../Context/AuthProvider"
import NoListing from "./NoListing"
import { motion } from "framer-motion"
import SkeletonCard from "../skeleton/SkeletonCard"

const AdminListing = () => {
  const { auth } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [listings, setListings] = useState({
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
      (listing) => listing.user._id === auth.data.id
    )
    setListings(ownListings)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllListings()
  }, [])

  if (isLoading) return <SkeletonCard />

  return (
    <>
      <div className="mt-10">
        <button
          className="border-2 text-lg border-gray-300 flex hover:border-gray-400 mr-auto ml-auto p-2"
          onClick={() => navigate("/admin/create")}
        >
          Add Listing
        </button>
      </div>
      {listings.length ? (
        <div className="bg-slate-50">
          <div className="mx-auto max-w-2xl  sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">All Listings</h2>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {listings.length &&
                listings.map((listing) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    key={listing._id}
                    onClick={() => navigate(`/admin/edit/${listing._id}`)}
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
                      <h3 className="text-sm font-medium text-gray-900">
                        <a>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {listing.title}
                        </a>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {listing.location}
                      </p>
                      <div className="flex flex-1 flex-col justify-end">
                        <p className="text-sm italic text-gray-500">
                          {listing.desc}
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          ${listing.rental} /Month
                        </p>
                        <span>
                          <p>Posted by {listing.user.username}</p>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <NoListing />
      )}
    </>
  )
}

export default AdminListing
