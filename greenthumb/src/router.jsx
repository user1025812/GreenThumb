import { createBrowserRouter, Navigate } from "react-router-dom";
//used ai to navigate automatically to home rather than the app.jsx
import Home from "./pages/Home";
import App from "./App";
import Join from "./pages/Join";
import PlantATree from "./pages/PlantATree";
import ProgressPage from "./pages/ProgressPage";  
import Track from "./pages/Track";
import AboutUs from "./pages/AboutUs";
import Faqs from "./pages/Faqs";
import Library from "./pages/Library";
import TreeDetails from "./pages/TreeDetails";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Trees from "./pages/Trees";
import Payment from "./pages/Payment";
import Progress from "./pages/Progress";
import Logout from "./pages/Logout";

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
      path: "/progresspage",
      element: <ProgressPage />,
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
      path: "/library",
      element: <Library />,
    },
    {
      path: "/treedetails",
      element: <TreeDetails />,
    },
    {
      path: "/",
      element: <Navigate to="/home" replace /> 
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    

        {
          path:"/dashboard",
          element:<Dashboard />,

          },
        

        {
          path:"/users",
          element:<Users />
        },
        

        {
          path:"/trees",
          element:<Trees />,

          },
        

        {
          path:"/payment",
          element:<Payment />
        },

        {
          path:"/progress",
          element:<Progress />
        },

        {
          path:"/logout",
          element:<Logout />,},
        
            

]);