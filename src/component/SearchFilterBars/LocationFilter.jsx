import React from "react"
import districtData from "../../data/districtData"

const LocationFilter = ({ listings, handleLocationChange }) => {
  return (
    <select
      value={listings?.location}
      id="filterLocation"
      onChange={(e) => handleLocationChange(e)}
      className="form-select block w-full sm:w-auto  border-2 rounded-md border-gray-400 text-base p-1"
    >
      <option value="">Filter by Location</option>
      {districtData.length &&
        districtData.map((district, index) => (
          <option key={index} value={district.join(", ")}>
            {district.join(", ")}
          </option>
        ))}
    </select>
  )
}

export default LocationFilter
