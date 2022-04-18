import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CarouselStyle } from "./styled";

const array = [
  {
    id: 0,
    cover:
      "https://uploads-ssl.webflow.com/60cd7ae35efaf14623f555c5/612e8aa3021b4224d2cc6511_how%20do%20i%20care%20for%20a%20sick%20dog.jpg",
    title: "반려동물이 아픈가요?",
    text: "병원 찾기",
    link: "/",
  },
  {
    id: 1,
    cover:
      "https://images.pexels.com/photos/5733168/pexels-photo-5733168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "여러분을 기다리고 있어요",
    text: "유기동물 조회",
    link: "/",
  },
  {
    id: 2,
    cover:
      "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg",
    title: "반려동물 등록은 필수입니다",
    text: "등록하기",
    link: "/",
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideActive, setSlideActive] = useState(false);
  const slideRef = useRef(null);

  const prevSlide = () => {
    if (currentSlide == 0) {
      setCurrentSlide(array.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide == array.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setCurrentSlide(currentSlide);
    slideRef.current.style.transition = "all 300ms ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const carouselItems = array.map((i) => {
    return (
      <div
        key={i.id}
        className="carousel-list"
        style={{ backgroundImage: `url(${i.cover})` }}
      >
        <div className="img-desc">
          <div className="desc-title">{i.title}</div>
          <Link to={`/`} className="desc-button">
            <span className="button">{i.text}</span>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <CarouselStyle
      onMouseOver={() => setSlideActive(true)}
      onMouseLeave={() => setSlideActive(false)}
    >
      <div className="carousel-wrapper" ref={slideRef}>
        {carouselItems}
      </div>
      {slideActive ? (
        <>
          <button className="slide-button prev" onClick={prevSlide}>
            <span className="prev-button">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  fill: "none",
                  height: "12px",
                  width: "12px",
                  stroke: "currentcolor",
                  strokeWidth: 4,
                  overflow: "visible",
                }}
              >
                <g fill="none">
                  <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
                </g>
              </svg>
            </span>
          </button>
          <button className="slide-button next" onClick={nextSlide}>
            <span className="next-button">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  fill: "none",
                  height: "12px",
                  width: "12px",
                  stroke: "currentcolor",
                  strokeWidth: 4,
                  overflow: "visible",
                }}
              >
                <g fill="none">
                  <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
                </g>
              </svg>
            </span>
          </button>
        </>
      ) : null}
    </CarouselStyle>
  );
}
