import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Join from "./pages/Join";
import PlantATree from "./pages/PlantATree";
import Progress from "./pages/Progress";  
import Track from "./pages/Track";
// import AboutUs from "./pages/AboutUs";
// import Faqs from "./pages/Faqs";

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
  
  // {
  //   path: "/aboutus",
  //   element: <AboutUs />,
  // },
  // {
  //   path: "/faqs",
  //   element: <Faqs />,
  // },
]);