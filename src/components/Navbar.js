import React, { useEffect, useState, useCallback } from "react";
import { NavStyle } from "./styled";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "images/nyang-gang.svg";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { authService } from "./fbase/fbase";

export default function Navbar(props) {
  const [subMenu, setSubMenu] = useState(false);
  const [shadow, setShadow] = useState(false);

  if (sessionStorage.getItem("uid") && !props.auth) {
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

  const handleScroll = useCallback(() => {
    if (window.scrollY <= 0) {
      setShadow(false);
    } else {
      setShadow(true);
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <NavStyle shadow={shadow}>
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
              <li className="nav-menu">
                <Link to="/shelter">유기동물 보호소</Link>
              </li>
              <li className="nav-menu">
                <Link to="/abandoned">유기동물 조회</Link>
              </li>
              {props.isLoggedIn ? (
                <>
                  <li className="nav-menu">
                    <a
                      href="https://www.animal.go.kr/front/community/show.do?boardId=contents&seq=66&menuNo=2000000016"
                      target="_blank"
                    >
                      내 반려동물 등록하기
                    </a>
                  </li>
                  <li className="nav-menu">
                    <div
                      className="profile"
                      onClick={() => setSubMenu((prev) => !prev)}
                    >
                      <img className="profile-image" />
                      <ul className={`nav-sub ${subMenu ? "open" : ""}`}>
                        <Link to="/myaccount">
                          <li className="nav-submenu">내 계정</li>
                        </Link>
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
      {props.setting && (
        <div className="nav-wrapper sub-nav-wrapper">
          <ul className="sub-nav-container">
            <Link to="/myaccount">
              <li className={`sub-nav-menu ${props.myaccount ? "open" : ""}`}>
                회원정보수정
              </li>
            </Link>
            <Link to="/change">
              <li className={`sub-nav-menu ${props.password ? "open" : ""}`}>
                비밀번호변경
              </li>
            </Link>
          </ul>
        </div>
      )}
    </NavStyle>
  );
}

// #ffe3b2
