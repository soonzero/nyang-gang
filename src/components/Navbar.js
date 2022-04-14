import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "images/nyang-gang.svg";

const NavStyle = styled.div`
  background-color: white;

  a {
    text-decoration: none;
  }

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
    padding: 10px 0px;
    margin-right: 25px;
    cursor: pointer;
    color: grey;
    transition: color 300ms ease-in-out;

    &:hover {
      color: #f57977;
    }
  }

  .nav-menu:last-child {
    margin-right: 0;
  }

  .profile {
    width: 30px;
    height: 30px;
    border: 1px solid grey;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export default function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          {!props.auth && (
            <div className="nav-side">
              <li className="nav-menu">병원 찾기</li>
              <li className="nav-menu">유기동물 보호소</li>
              <li className="nav-menu">유기동물 조회</li>
              {isLoggedIn ? (
                <>
                  <li className="nav-menu">내 반려동물 등록하기</li>
                  <li className="nav-menu">
                    <div className="profile">
                      <img src="https://pbs.twimg.com/media/EU2bPq7UcAEJRp5.jpg" />
                    </div>
                  </li>
                </>
              ) : (
                <Link to="/auth">
                  <li className="nav-menu">로그인 / 회원가입</li>
                </Link>
              )}
            </div>
          )}
        </ul>
      </div>
    </NavStyle>
  );
}

// #ffe3b2
