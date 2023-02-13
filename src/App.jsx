import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminListing from "./component/admin/AdminListing"
import ProtectedRoute from "./component/auth/ProtectedRoute"
// import NoListing from "./component/NoListing"
import AddListing from "./component/admin/AddListing"
import AdminDashboard from "./component/admin/AdminDashboard"
import AdminLayout from "./pages/AdminLayout"
import ChangePwd from "./component/admin/ChangePwd"
import EditListing from "./component/admin/EditListing"
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
                <Route index element={<AdminListing />} />
                <Route path="/admin/changepwd" element={<ChangePwd />} />
                <Route path="/admin/edit/:id" element={<EditListing />} />
                <Route path="/admin/create" element={<AddListing />} />
                <Route path="/admin/dash" element={<AdminDashboard />} />
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
