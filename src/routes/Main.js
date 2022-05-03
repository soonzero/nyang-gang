import Carousel from "components/Carousel";
import Navbar from "components/Navbar";
import { ContentStyle } from "components/styled";
import React from "react";

export default function Main() {
  return (
    <>
      <Navbar />
      <ContentStyle>
        <Carousel />
      </ContentStyle>
    </>
  );
}
