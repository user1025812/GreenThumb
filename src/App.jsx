import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Trees from "./pages/Trees";
import Payment from "./pages/Payment";
import Progress from "./pages/Progress";
import Logout from "./pages/Logout";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*DEFAULT PAGE*/}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/*DASHBOARD*/}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/*USERS*/}
        <Route
          path="/users"
          element={<Users />}
        />

        {/*TREES*/}
        <Route
          path="/trees"
          element={<Trees />}
        />

        {/*PAYMENT*/}
        <Route
          path="/payment"
          element={<Payment />}
        />

        {/*PROGRESS*/}
        <Route
          path="/progress"
          element={<Progress />}
        />

        {/*LOGOUT*/}
        <Route
          path="/logout"
          element={<Logout />}
        />
      </Routes>
    </BrowserRouter>
  );
}