import React from "react";
import Login from "./Login";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Hospital from "routes/Hospital";
import Shelter from "./Shelter";
import Abandoned from "./Abandoned";

export default function AppRouter(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/abandoned" element={<Abandoned />} />
      </Routes>
    </Router>
  );
}
