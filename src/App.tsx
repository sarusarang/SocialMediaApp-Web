import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import SuspenseLoader from "./components/Loaders/SuspenseLoader"
import { ProtectedAuthRoute } from "./routes/ProtectedAuth"
import { Toaster } from "sonner"




// Lazy loading pages
const Feed = lazy(() => import("./Pages/Feed"))
const Auth = lazy(() => import("./Pages/Auth"))
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"))
const Profile = lazy(() => import("./Pages/Profile"))
const UsersProfile = lazy(() => import("./Pages/UsersProfile"))
const EditProfile = lazy(() => import("./Pages/EditProfile"))
const PeoplePage = lazy(() => import("./Pages/PeoplePage"))
const Notifcation = lazy(() => import("./Pages/Notification"))
const CreatePost = lazy(() => import("./Pages/CreatePost"))
const Settings = lazy(() => import("./Pages/Settings"))
const NotFound = lazy(() => import("./Pages/NotFound"))




// lazy loading layout
const MainLayout = lazy(() => import("./components/Layout/MainLayout"))
const AuthLayout = lazy(() => import("./components/Layout/AuthLayout"))





function App() {


  return (


    <>

      <Suspense fallback={<SuspenseLoader fullScreen text="Loading..." />}>


        <Routes>


          {/* Main Layout */}
          <Route element={<ProtectedAuthRoute><MainLayout /> </ProtectedAuthRoute>} >

            <Route index element={<Feed />} />

            <Route path="profile" element={<Profile />} />

            <Route path="userprofile/:username" element={<UsersProfile />} />

            <Route path="edit-profile" element={<EditProfile />} />

            <Route path="people" element={<PeoplePage />} />

            <Route path="create" element={<CreatePost />} />

            <Route path="notifications" element={<Notifcation />} />

            <Route path="settings" element={<Settings />} />

          </Route>


          {/* Auth Layout */}
          <Route element={<AuthLayout />} >

            <Route path="auth" element={<Auth />} />

            <Route path="forgot-password" element={<ForgotPassword />} />

          </Route>


          {/* 404 */}
          <Route path="*" element={<NotFound />} />


        </Routes>


        <Toaster />


      </Suspense>


    </>

  )
}

export default App
