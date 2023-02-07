import React from "react"

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
    <input
      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      type="text"
      placeholder="Search keywords"
      id="search"
      autoComplete="off"
      onChange={handleSearchChange}
    />
  )
}

export default SearchBar
