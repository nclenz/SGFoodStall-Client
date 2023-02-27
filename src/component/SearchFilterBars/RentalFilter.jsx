import React from "react"

const RentalFilter = ({ rentalRange, handleRentalRangeChange }) => {
  return (
    <select
      value={rentalRange}
      id="filterRent"
      onChange={handleRentalRangeChange}
      className="form-select block w-full sm:w-auto border-2 rounded-md border-gray-400 text-base p-1 "
    >
      <option value="">Filter By Rent</option>
      <option value="below2k">Below $2,000</option>
      <option value="2k-5k">$2,000 - $5,000</option>
      <option value="5k-10k">$5,000 - $10,000</option>
      <option value="moreThan10k">More than $10,000</option>
    </select>
  )
}

export default RentalFilter
