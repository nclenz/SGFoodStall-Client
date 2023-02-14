import { BrowserRouter, Route, Routes } from "react-router-dom"
import React, { lazy, Suspense } from "react"

const AdminListing = lazy(() => import("./component/admin/AdminListing"))
const Login = lazy(() => import("./pages/Login"))
const AdminDashboard = lazy(() => import("./component/admin/AdminDashboard"))
const EditListing = lazy(() => import("./component/admin/EditListing"))
const SingleListing = lazy(() => import("./pages/SingleListing"))
const AdminLayout = lazy(() => import("./pages/AdminLayout"))
const AddListing = lazy(() => import("./component/admin/AddListing"))
const Homepage = lazy(() => import("./pages/Homepage"))
const Missing = lazy(() => import("./pages/Missing"))
const ChangePwd = lazy(() => import("./component/admin/ChangePwd"))
const PublicLayout = lazy(() => import("./pages/PublicLayout"))
const ProtectedRoute = lazy(() => import("./component/auth/ProtectedRoute"))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<h1>Loading....</h1>}>
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
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
