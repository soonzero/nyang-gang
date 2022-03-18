import React from "react";
import Auth from "./Auth";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter(props) {
  return (
    <Router>
      <Routes>
        {props.isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
}
