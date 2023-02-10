import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EnquiryForm from "../component/EnquiryForm"
import { useNavigate } from "react-router-dom"

const SingleListing = () => {
  const [listing, setListing] = useState({})
  const [listingID, setListingID] = useState("")
  const navigate = useNavigate()

  const { id } = useParams()
  const fetchSelectedListing = async () => {
    const response = await axios.get(`/api/listings/listing/${id}`)
    setListing(response.data)
    // console.log(listingID)
    // console.log(response.data)
  }

  useEffect(() => {
    setListingID(id)
    fetchSelectedListing()
  }, [])
  console.log(listingID)

  return (
    <div className="border border-gray-300  bg-slate-50">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="flex items-center text-xl">
          <a
            href="#"
            onClick={() => navigate(-1)}
            className=" text-gray-500 hover:text-gray-900"
          >
            Back
          </a>
        </div>
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center ">
          <section aria-labelledby="options-heading">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Express Interest
              </h1>
            </div>
            <EnquiryForm listingID={listingID} />
          </section>
        </div>
        {/* Title */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <div className="mt-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {listing.title}
            </h1>
          </div>
          <section aria-labelledby="information-heading" className="mt-4">
            {/* Image */}
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img
                src={listing.image}
                alt="Stall Images"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                ${listing.rental}/Month
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                Location: {listing.location}
              </p>
            </div>
            <div className=" space-y-6">
              <p className="text-lg text-gray-900 sm:text-xl">
                Description: {listing.desc}
              </p>
            </div>
            <div className=" space-y-6">
              {listing.cuisine && listing.cuisine[0] ? (
                <p className="text-lg text-gray-900 sm:text-xl">
                  Suitable for {listing.cuisine}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default SingleListing
