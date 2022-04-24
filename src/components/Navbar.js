import React, { useState } from "react";
import { NavStyle } from "./styled";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "images/nyang-gang.svg";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { authService } from "./fbase/fbase";

export default function Navbar(props) {
  const [subMenu, setSubMenu] = useState(false);
  if (sessionStorage.getItem("uid")) {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${sessionStorage.getItem("uid")}.png`))
      .then((url) => {
        const img = document.querySelector(".profile-image");
        img.setAttribute("src", url);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("refreshToken");
    authService.signOut();
    props.setIsLoggedIn(false);
  };

  return (
    <NavStyle>
      <div className="nav-wrapper">
        <ul className="nav-container">
          <Link to="/">
            <li className="nav-logo">
              <span className="logo-img">
                <Logo fill="white" />
              </span>
              <span className="logo-text">냥갱</span>
            </li>
          </Link>
          {!props.auth && (
            <div className="nav-side">
              <li className="nav-menu">
                <Link to="/hospital">병원 찾기</Link>
              </li>
              <li className="nav-menu">유기동물 보호소</li>
              <li className="nav-menu">유기동물 조회</li>
              {props.isLoggedIn ? (
                <>
                  <li className="nav-menu">내 반려동물 등록하기</li>
                  <li className="nav-menu">
                    <div
                      className="profile"
                      onClick={() => setSubMenu((prev) => !prev)}
                    >
                      <img className="profile-image" />
                      <ul className={`nav-sub ${subMenu ? "open" : ""}`}>
                        <li className="nav-submenu">내 계정</li>
                        <li className="nav-submenu">내 반려동물</li>
                        <li className="nav-submenu" onClick={logout}>
                          로그아웃
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              ) : (
                <li className="nav-menu">
                  <Link to="/login">로그인</Link> /{" "}
                  <Link to="/signup">회원가입</Link>
                </li>
              )}
            </div>
          )}
        </ul>
      </div>
    </NavStyle>
  );
}

// #ffe3b2
