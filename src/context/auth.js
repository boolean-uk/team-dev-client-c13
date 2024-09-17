import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Header from "../components/header";
import Modal from "../components/modal";
import Navigation from "../components/navigation";
import useAuth from "../hooks/useAuth";
import { createProfile, login, register } from "../service/apiClient";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // const storedUser = JSON.parse(localStorage.getItem("user"));

    // const userToStore = {
    //   id: user.id,
    //   role: user.role,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    // };

    if (storedToken) {
      setToken(storedToken);
      console.log("user", user)
      // setUser(storedUser);
      if (location.state?.from?.pathname) {
        navigate(location.state.from.pathname || "/");
      }
    }
  }, [location.state?.from?.pathname, navigate]);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);

    if (!res.data.token) {
      return navigate("/login");
    }

    console.log("res", res.data.user.role)

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setUser(res.data.user);
    // console.log("user", user.role)
    // const userToStore = {
    //   role: res.data.user.role,
    //   firstName: res.data.user.firstName,
    //   lastName: res.data.user.lastName,
    // };
    // localStorage.setItem("user", JSON.stringify(userToStore));
    navigate(location.state?.from?.pathname || "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const handleRegister = async (email, password) => {
    const res = await register(email, password);
    setToken(res.data.token);

    navigate("/verification");
  };

  const handleCreateProfile = async (firstName, lastName, githubUrl, bio, profilePicture) => {
    const { userId } = jwt_decode(token);
    localStorage.setItem("token", token);

    const res = await createProfile(
      userId,
      firstName,
      lastName,
      githubUrl,
      bio,
      profilePicture
    );

    // localStorage.setItem("user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setUser(res.data.user);

    navigate("/");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
