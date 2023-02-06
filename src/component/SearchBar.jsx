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
      className="search__input"
      type="text"
      placeholder="Search keywords"
      id="search"
      autoComplete="off"
      onChange={handleSearchChange}
    />
  )
}

export default SearchBar
