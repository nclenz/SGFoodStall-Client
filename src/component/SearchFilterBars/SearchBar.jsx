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
    <>
      <div className="relative">
        <input
          className="block w-full text-base p-1 sm:w-auto border-2 rounded-md border-gray-400 pl-8 placeholder-black"
          type="text"
          placeholder="Search keywords"
          id="search"
          autoComplete="off"
          onChange={handleSearchChange}
        />
        <MagnifyingGlassIcon
          className="h-5 w-5 text-black absolute top-2 left-2"
          // aria-hidden="true"
        />
      </div>
    </>
  )
}

export default SearchBar
