import axios from "axios"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const EnquiryForm = (listingID) => {
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState("")

  const navigate = useNavigate()

  const [enquiry, setEnquiry] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    msg: "",
  })

  useEffect(() => {
    if (listingID.listingID) {
      setEnquiry({ ...enquiry, id: listingID.listingID })
    }
  }, [listingID])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/enquiry/send", enquiry)
      alert("Enquiry Sent. We will get back to you within 3 working days")
      navigate("/")
    } catch (error) {
      if (error.response?.status === 500) {
        setErrMsg("No Server Response")
      } else if (
        error.response.data.errors[0].msg === "Mobile Number is required"
      ) {
        setErrMsg("Invalid Mobile Number")
      } else {
        setErrMsg("Failed to submit")
      }
    }
  }

  return (
    <>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form
        className="border border-gray-300 p-5 rounded-lg bg-slate-50"
        onSubmit={handleSubmit}
      >
        <title>Enquiry Form</title>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          required
          id="name"
          placeholder="Your name"
          onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="Your email (Optional)"
          onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
        />

        <label htmlFor="mobile">Mobile: </label>
        <input
          type="text"
          id="mobile"
          required
          placeholder="Contact Number"
          onChange={(e) => setEnquiry({ ...enquiry, mobile: e.target.value })}
        />

        <label htmlFor="msg">Message: </label>
        <textarea
          id="msg"
          cols="30"
          rows="3"
          placeholder="Messages"
          onChange={(e) => setEnquiry({ ...enquiry, msg: e.target.value })}
        />
        <button>Submit</button>
      </form>
    </>
  )
}

export default EnquiryForm
