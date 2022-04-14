import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CarouselStyle = styled.div`
  max-width: 1130px;
  max-height: 100%;
  padding: 25px 40px;
  margin: 0 auto;
  position: relative;
  /* box-sizing: border-box; */

  a {
    cursor: pointer;
  }

  .carousel-wrapper {
    overflow: hidden;
    display: flex;
    width: 100%;
  }

  .carousel-list {
    flex: 0 0 100%;

    &:hover {
      .slide-button {
        position: absolute;
        font-size: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1rem;
        height: 1rem;
        background-color: white;
        padding: 10px;
        color: black;
        border-radius: 50%;
        border: 1px solid #f5f5f5;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        z-index: 2;
        box-sizing: content-box;
        opacity: 0.6;
        transition: opacity 150ms ease;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .img-container {
    width: 100%;
    padding-top: 46.25%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;
  }

  .img-desc {
    max-width: 1130px;
    padding: 40px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  .desc-title {
    width: 25%;
    color: white;
    font-size: 3.5rem;
    text-align: right;
    word-break: keep-all;
    line-height: 1.2;
    font-weight: 600;
  }

  .desc-button {
    padding: 12px 20px;
    background-color: white;
    border-radius: 8px;
  }

  .prev {
    left: 20px;
  }

  .next {
    right: 20px;
  }
`;

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
      "https://cdn.pixabay.com/photo/2020/06/10/11/20/dogs-5282275_1280.jpg",
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
  const carouselItems = array.map((i) => {
    return (
      <div key={i.id} className="carousel-list">
        <div
          className="img-container"
          style={{ backgroundImage: `url(${i.cover})` }}
        >
          <div className="img-desc">
            <div className="desc-title">{i.title}</div>
            <a className="desc-button">
              <span className="button">{i.text}</span>
            </a>
          </div>
        </div>
      </div>
    );
  });

  return (
    <CarouselStyle>
      <button className="slide-button prev">
        <span className="prev-button">{`<`}</span>
      </button>
      <div className="carousel-wrapper">{carouselItems}</div>
      <button className="slide-button next">
        <span className="next-button">{`>`}</span>
      </button>
    </CarouselStyle>
  );
}
