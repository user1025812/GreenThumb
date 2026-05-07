import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import AboutUs from "./pages/AboutUs";
import Faqs from "./pages/Faqs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/faqs",
    element: <Faqs />,
  },
]);