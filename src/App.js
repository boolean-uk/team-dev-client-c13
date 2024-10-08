import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Loading from "./pages/loading";
import Verification from "./pages/verification";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";
import { AuthProvider, ProtectedRoute } from "./context/auth";
import { ModalProvider } from "./context/modal";
import { ProfileProvider } from "./context/profile";
import Welcome from "./pages/welcome";

const App = () => {
  return (
    <>
      <ProfileProvider>
        <AuthProvider>
          <ModalProvider>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="loading" element={<Loading />} />
              <Route path="verification" element={<Verification />} />

              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="welcome"
                element={
                  <ProtectedRoute disabledNav={true}>
                    <Welcome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ModalProvider>
        </AuthProvider>
      </ProfileProvider>
    </>
  );
};

export default App;
