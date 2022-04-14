import React from "react";
import Auth from "./Auth";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter(props) {
  return (
    <Router>
      <Routes>
        {props.isLoggedIn ? (
          <Route path="/" element={<Main />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
}
