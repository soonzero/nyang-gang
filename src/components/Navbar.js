import React, { useEffect, useState, useCallback } from "react";
import { NavStyle } from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "images/nyang-gang.svg";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { authService, db } from "./fbase/fbase";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar(props) {
  const navigate = useNavigate();

  const [hospitalSub, setHospitalSub] = useState(false);
  const [abandSub, setAbandSub] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [admin, setAdmin] = useState(false);
  const [menusInProfile, setMenusInProfile] = useState(
    window.innerWidth <= 768
  );

  if (sessionStorage.getItem("uid") && !props.auth) {
    const storage = getStorage();
    getDownloadURL(
      ref(storage, `users/${sessionStorage.getItem("uid")}/profile-image`)
    )
      .then((url) => {
        const img = document.querySelector(".profile-image");
        img.setAttribute("src", url);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const setAuthority = async () => {
    const userRef = doc(db, "users", sessionStorage.getItem("uid"));
    const userSnap = await getDoc(userRef);
    if (userSnap.data().auth) {
      setAdmin(true);
    } else {
      return;
    }
  };

  const logout = () => {
    alert("로그아웃이 완료되었습니다");
    navigate("/");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("refreshToken");
    authService.signOut();
    props.setIsLoggedIn(false);
  };

  const handleScroll = useCallback(() => {
    if (props.license) {
      if (!menusInProfile) {
        if (window.scrollY > window.innerHeight) {
          setShadow(true);
        } else {
          setShadow(false);
        }
      } else {
        if (window.scrollY > 0) {
          setShadow(true);
        } else {
          setShadow(false);
        }
      }
    } else {
      if (window.scrollY <= 0) {
        setShadow(false);
      } else {
        setShadow(true);
      }
    }
  });

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768) {
      setMenusInProfile(true);
    } else {
      setMenusInProfile(false);
    }
  });

  useEffect(() => {
    setAuthority();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <NavStyle shadow={shadow} subnav={props.subnav}>
      <div className="nav-wrapper">
        <ul className="nav-container">
          <Link to="/">
            <li className="nav-logo">
              <span className="logo-img">
                <Logo color="#f57977" />
              </span>
              {!menusInProfile && <span className="logo-text">냥갱</span>}
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
                        {menusInProfile && (
                          <>
                            <Link to="/hospital">
                              <li className="nav-submenu hospital">
                                병원 찾기
                              </li>
                            </Link>
                            <Link to="/pharmacy">
                              <li className="nav-submenu pharmacy">
                                약국 찾기
                              </li>
                            </Link>
                            <Link to="/shelter">
                              <li className="nav-submenu shelter">
                                보호소 찾기
                              </li>
                            </Link>
                            <Link to="/abandoned">
                              <li className="nav-submenu abandoned">
                                유기 동물 조회
                              </li>
                            </Link>
                            <Link to="/adoption">
                              <li className="nav-submenu adoption">입양</li>
                            </Link>
                            <Link to="/license">
                              <li className="nav-submenu license">
                                반려동물 등록
                              </li>
                            </Link>
                          </>
                        )}
                        <Link to="/myaccount">
                          <li className="nav-submenu">내 계정</li>
                        </Link>
                        <Link to="/favorite">
                          <li className="nav-submenu">내 즐겨찾기</li>
                        </Link>
                        {admin && (
                          <Link to="/admin">
                            <li className="nav-submenu admin">관리자 메뉴</li>
                          </Link>
                        )}
                        <li className="nav-submenu signout" onClick={logout}>
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
      {props.favorite && (
        <div className="nav-wrapper sub-nav-wrapper">
          <ul className="sub-nav-container">
            <li
              className={`sub-nav-menu ${props.filter == "all" ? "open" : ""}`}
              onClick={() => props.setFilter("all")}
            >
              모아보기
            </li>
            <li
              className={`sub-nav-menu ${
                props.filter == "hospital" ? "open" : ""
              }`}
              onClick={() => props.setFilter("hospital")}
            >
              병원
            </li>
            <li
              className={`sub-nav-menu ${
                props.filter == "pharmacy" ? "open" : ""
              }`}
              onClick={() => props.setFilter("pharmacy")}
            >
              약국
            </li>
            <li
              className={`sub-nav-menu ${
                props.filter == "shelter" ? "open" : ""
              }`}
              onClick={() => props.setFilter("shelter")}
            >
              보호소
            </li>
          </ul>
        </div>
      )}
      {props.admin && (
        <div className="nav-wrapper sub-nav-wrapper">
          <ul className="sub-nav-container">
            <li
              className={`sub-nav-menu ${
                props.filter == "waiting" ? "open" : ""
              }`}
              onClick={() => props.setFilter("waiting")}
            >
              승인 대기 중
            </li>
            <li
              className={`sub-nav-menu ${
                props.filter == "approved" ? "open" : ""
              }`}
              onClick={() => props.setFilter("approved")}
            >
              승인 완료
            </li>
            <li
              className={`sub-nav-menu ${
                props.filter == "rejected" ? "open" : ""
              }`}
              onClick={() => props.setFilter("rejected")}
            >
              승인 거절
            </li>
          </ul>
        </div>
      )}
    </NavStyle>
  );
}

// #ffe3b2
