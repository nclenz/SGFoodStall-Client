import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminDash from "./component/AdminDash"
import ProtectedRoute from "./component/auth/ProtectedRoute"
import AddListing from "./pages/AddListing"
import AdminLayout from "./pages/AdminLayout"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Missing from "./pages/Missing"
import PublicLayout from "./pages/PublicLayout"
import SingleListing from "./pages/SingleListing"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/listing/:id" element={<SingleListing />} />
            <Route path="/login" element={<Login />} />

            {/*Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDash />} />
                <Route path="/admin/create" element={<AddListing />} />
              </Route>
            </Route>
            {/*End Protected Route */}
            {/* catch all other routes */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
