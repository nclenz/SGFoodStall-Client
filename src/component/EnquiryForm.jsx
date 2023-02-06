import { useContext, useState, useRef } from "react"

import AuthContext from "../Context/AuthProvider"

const EnquiryForm = () => {
  const { auth } = useContext(AuthContext)
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState("")

  const [enquiry, setEnquiry] = useState({
    user: auth.id,
    name: "",
    email: "",
    mobile: "",
    msg: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="mobile">Mobile: : </label>
        <input
          type="text"
          id="mobile"
          placeholder="Contact Number"
          onChange={(e) => setEnquiry({ ...enquiry, mobile: e.target.value })}
        />

        <label htmlFor="msg">Message: : </label>
        <textarea
          id="msg"
          cols="30"
          rows="10"
          placeholder="Messages"
          onChange={(e) => setEnquiry({ ...enquiry, msg: e.target.value })}
        />
        <button>Submit</button>
      </form>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
    </>
  )
}

export default EnquiryForm
