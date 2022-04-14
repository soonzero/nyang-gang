import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "images/nyang-gang.svg";

const NavStyle = styled.div`
  background-color: white;

  .nav-container {
    height: 80px;
    max-width: 1130px;
    padding: 0 40px;
    margin: 0 auto;

    ul {
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
    }
  }

  .nav-logo {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .logo-img {
    height: 30px;
    padding: 15px 0px;
  }

  .logo-text {
    margin-left: 10px;
    font-weight: 500;
    color: #f57977;
    font-size: 1.2rem;
    letter-spacing: -0.05rem;
  }

  .nav-side {
    display: flex;
    align-items: center;
  }

  .nav-menu {
    padding: 10px 20px;
    cursor: pointer;
    color: grey;
    transition: color 300ms ease-in-out;

    &:hover {
      color: #f57977;
    }
  }

  .nav-menu:last-child {
    padding-right: 0;
  }
`;

export default function Navbar() {
  return (
    <NavStyle>
      <div className="nav-container">
        <ul>
          <li className="nav-logo">
            <span className="logo-img">
              <Logo fill="white" />
            </span>
            <span className="logo-text">냥갱</span>
          </li>
          <div className="nav-side">
            <li className="nav-menu">병원 찾기</li>
            <li className="nav-menu">유기동물 보호소</li>
            <li className="nav-menu">유기동물 조회</li>
            <li className="nav-menu">내 반려동물 등록하기</li>
            <li className="nav-menu">
              <div className="profile">
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "white",
                    border: "1px solid grey",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </li>
          </div>
        </ul>
      </div>
    </NavStyle>
  );
}

// #ffe3b2
