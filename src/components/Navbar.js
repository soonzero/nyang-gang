import React, { useEffect, useState, useCallback } from "react";
import { NavStyle } from "./styled";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "images/nyang-gang.svg";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { authService } from "./fbase/fbase";

export default function Navbar(props) {
  const [hospitalSub, setHospitalSub] = useState(false);
  const [abandSub, setAbandSub] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();

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
    if (props.license) {
      if (window.scrollY > window.innerHeight) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    } else {
      if (window.scrollY <= 0) {
        setShadow(false);
      } else {
        setShadow(true);
      }
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
    <NavStyle shadow={shadow}>
      <div className="nav-wrapper">
        <ul className="nav-container">
          <Link to="/">
            <li className="nav-logo">
              <span className="logo-img">
                <Logo color="#f57977" />
              </span>
              <span className="logo-text">냥갱</span>
            </li>
          </Link>
          {!props.auth && (
            <div className="nav-side">
              <li
                className="nav-menu float-menu"
                onMouseOver={() => setHospitalSub(true)}
                onMouseLeave={() => setHospitalSub(false)}
              >
                <Link to="/hospital">병원 / 약국</Link>
                {hospitalSub && (
                  <ul className="float-sub">
                    <Link to="/hospital" className="float-submenu">
                      <span>동물 병원</span>
                    </Link>
                    <Link to="/pharmacy" className="float-submenu">
                      <span>동물 약국</span>
                    </Link>
                  </ul>
                )}
              </li>
              <li
                className="nav-menu float-menu"
                onMouseOver={() => setAbandSub(true)}
                onMouseLeave={() => setAbandSub(false)}
              >
                <Link to="/shelter">유기 동물</Link>
                {abandSub && (
                  <ul className="float-sub">
                    <Link to="/shelter" className="float-submenu">
                      <span>보호소 찾기</span>
                    </Link>
                    <Link to="/abandoned" className="float-submenu">
                      <span>유기 동물 조회</span>
                    </Link>
                  </ul>
                )}
              </li>
              <li className="nav-menu">
                <Link to="/adoption">입양</Link>
              </li>
              <li className="nav-menu">
                <Link to="/license">반려동물 등록</Link>
              </li>

              {isLoggedIn ? (
                <>
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
