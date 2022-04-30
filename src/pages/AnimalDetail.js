import Navbar from "components/Navbar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AnimalDetail() {
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("accessToken") &&
      sessionStorage.getItem("uid")
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}
