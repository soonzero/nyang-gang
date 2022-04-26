import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CarouselStyle } from "./styled";
import { ReactComponent as Prev } from "images/prev.svg";
import { ReactComponent as Next } from "images/next.svg";

const array = [
  {
    id: 0,
    cover:
      "https://uploads-ssl.webflow.com/60cd7ae35efaf14623f555c5/612e8aa3021b4224d2cc6511_how%20do%20i%20care%20for%20a%20sick%20dog.jpg",
    title: "반려동물이 아픈가요?",
    text: "병원 찾기",
    link: "/hospital",
  },
  {
    id: 1,
    cover:
      "https://images.pexels.com/photos/5733168/pexels-photo-5733168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "여러분을 기다리고 있어요",
    text: "유기동물 조회",
    link: "/abandoned",
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideActive, setSlideActive] = useState(false);
  const slideRef = useRef(null);

  const prevSlide = () => {
    if (currentSlide == 0) {
      setCurrentSlide(array.length);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide == array.length) {
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
          <Link to={i.link} className="desc-button">
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
        <div
          className="carousel-list"
          style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg")`,
          }}
        >
          <div className="img-desc">
            <div className="desc-title">반려동물 등록은 필수입니다</div>
            <a
              href="https://www.animal.go.kr/front/community/show.do?boardId=contents&seq=66&menuNo=2000000016"
              target="_blank"
              className="desc-button"
            >
              <span className="button">등록하기</span>
            </a>
          </div>
        </div>
      </div>
      {slideActive ? (
        <>
          <button className="slide-button prev" onClick={prevSlide}>
            <span className="prev-button">
              <Prev />
            </span>
          </button>
          <button className="slide-button next" onClick={nextSlide}>
            <span className="next-button">
              <Next />
            </span>
          </button>
        </>
      ) : null}
    </CarouselStyle>
  );
}
