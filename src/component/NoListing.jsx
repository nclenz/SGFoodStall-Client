import { Link } from "react-router-dom"

const NoListing = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1 className="text-2xl font-semibold">
        You have not made a listing yet.
      </h1>
      <p className="text-xl">
        List your stalls here and reach a wider audience!
      </p>
      <button className="border text-xl flex ml-80 mt-10">
        <Link to="/admin/create">Add Listing</Link>
      </button>
    </article>
  )
}

export default NoListing
