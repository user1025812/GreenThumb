import { createBrowserRouter, Navigate } from "react-router-dom";
//used ai to navigate automatically to home rather than the app.jsx
import Home from "./pages/Home";
import App from "./App";
import Join from "./pages/Join";
import PlantATree from "./pages/PlantATree";
import Progress from "./pages/Progress";  
import Track from "./pages/Track";
import AboutUs from "./pages/AboutUs";
import Faqs from "./pages/Faqs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/plantatree",
    element: <PlantATree />,
  },
    {
      path: "/progress",
      element: <Progress />,
    },
    {
      path: "/track",
      element: <Track />,
    }, 
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path: "/faqs",
      element: <Faqs />,
    },
    {
      path: "/",
      element: <Navigate to="/home" replace /> 
    },
    {
      path: "/home",
      element: <Home />,
    }

]);