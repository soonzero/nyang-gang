import Carousel from "components/Carousel";
import Navbar from "components/Navbar";
import React, { useState, useEffect } from "react";

export default function Main() {
  return (
    <>
      <Navbar />
      <div className="carousel-container" style={{ padding: "25px 0" }}>
        <Carousel />
      </div>
    </>
  );
}
