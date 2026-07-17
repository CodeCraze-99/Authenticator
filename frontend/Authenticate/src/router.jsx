import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/pages/Home.jsx";
import Register from "./components/pages/Register.jsx";
import Login from "./components/pages/Login.jsx";
import Profile from "./components/pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  }

]);

export default router;