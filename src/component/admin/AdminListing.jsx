import axios from "axios"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../Context/AuthProvider"
import NoListing from "./NoListing"

const AdminListing = () => {
  const { auth } = useContext(AuthContext)
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
  }

  useEffect(() => {
    fetchAllListings()
  }, [])

  return (
    <>
      <button
        className="border-2 border-gray-300 b flex mt-8 mr-60 float-right hover:border-gray-400"
        onClick={() => navigate("/admin/create")}
      >
        <span className="text-base ">Add Listing</span>
      </button>
      {listings.length ? (
        <div className="bg-slate-50">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">All Listings</h2>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {listings.length &&
                listings.map((listing) => (
                  <div
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
                  </div>
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
