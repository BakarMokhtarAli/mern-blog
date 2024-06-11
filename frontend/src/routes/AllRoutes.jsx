import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "../components";
import { PrivateRoutes } from "./PrivateRoutes";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import {
  CreatePost,
  Dashboard,
  Home,
  Login,
  PageNotFound,
  Register,
  UpdatePost,
  UpdateUser,
  UpdateUserPassword,
} from "../pages";

export const AllRoutes = () => {
  const { user } = useUser();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        {/* <Route path="/posts" element={<Posts />} /> */}
        <Route
          path="/create-post"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-post/:id"
          element={
            <PrivateRoutes>
              <UpdatePost />
            </PrivateRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/update-user/:id"
          element={
            <PrivateRoutes>
              <UpdateUser />
            </PrivateRoutes>
          }
        />
        <Route
          path="/update-user-password/:id"
          element={
            <PrivateRoutes>
              <UpdateUserPassword />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};
