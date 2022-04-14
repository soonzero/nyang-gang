import React from "react";
import Login from "./Login";
import Home from "./Home";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
