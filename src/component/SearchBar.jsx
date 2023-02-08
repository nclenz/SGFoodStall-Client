import React from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

const SearchBar = ({ setSearchResult, listings }) => {
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase()
    if (!e.target.value) return setSearchResult(listings)

    const resultsArray = listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchQuery) ||
        listing.desc.toLowerCase().includes(searchQuery) ||
        listing.location.toLowerCase().includes(searchQuery)
    )

    setSearchResult(resultsArray)
  }
  return (
    <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-center my-5  ">
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
          <input
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            type="text"
            placeholder="Search keywords"
            id="search"
            autoComplete="off"
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
