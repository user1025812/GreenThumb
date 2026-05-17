import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
)