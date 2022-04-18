import Carousel from "components/Carousel";
import Navbar from "components/Navbar";
import React, { useState, useEffect } from "react";

export default function Main() {
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
  });

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="carousel-container" style={{ padding: "25px 0" }}>
        <Carousel />
      </div>
    </>
  );
}
