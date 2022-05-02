import Navbar from "components/Navbar";
import { ReactComponent as Logo } from "images/nyang-gang.svg";
import { ReactComponent as Down } from "images/next.svg";
import {
  ContentStyle,
  LicenseFullScreenStyle,
  LicenseStyle,
} from "components/styled";
import React from "react";
import { Link } from "react-router-dom";

export default function License() {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <LicenseFullScreenStyle>
        <div className="container">
          <div className="clip clip-left"></div>
          <div className="clip clip-right"></div>
          <Link to="/">
            <div className="logo">
              <Logo color="black" />
            </div>
          </Link>
          <div className="down" onClick={scrollDown}>
            <Down color="black" />
          </div>
        </div>
      </LicenseFullScreenStyle>
      <Navbar license />
      <ContentStyle>
        <LicenseStyle>
          <div className="content">
            <h1 className="content-header">동물등록제</h1>
            <div className="license-cards">
              <div className="license-card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage:
                      "url(https://cdn.pixabay.com/photo/2015/03/05/17/34/calendar-660669_1280.jpg)",
                  }}
                />
                <div className="card-text">
                  <h3>시행 일자</h3>
                  <p>2014년 1월 1일부터!</p>
                  <p>반려견만 의무 등록</p>
                </div>
              </div>
              <div className="license-card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage:
                      "url(https://cdn.pixabay.com/photo/2017/06/27/00/47/dog-2445790_1280.jpg)",
                  }}
                />
                <div className="card-text">
                  <h3>등록 대상</h3>
                  <p>월령 2개월 이상의 반려견 모두!</p>
                  <p>반려묘는 보호자 희망 시 등록 가능</p>
                </div>
              </div>
              <div className="license-card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage:
                      "url(https://www.animal.go.kr/front/images/sub/sub02_01_img3-2.png)",
                  }}
                />
                <div className="card-text">
                  <h3>등록 기관</h3>
                  <p>가까운 시·군·구청 혹은 대행업체</p>
                  <p>등록 가능 여부를 미리 확인!</p>
                </div>
              </div>
              <div className="license-card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage:
                      "url(https://cdn.pixabay.com/photo/2020/07/03/13/53/cat-5366422_1280.jpg)",
                  }}
                />
                <div className="card-text">
                  <h3>등록 목적</h3>
                  <p>동물 보호와 유실 및 유기 방지</p>
                  <p>보호자를 쉽게 찾을 수 있어요</p>
                </div>
              </div>
            </div>
            <div className="extra-desc">
              <span>
                매년 자진 신고 기간을 운영하고 있어요. 다만, 미등록 시 최대
                100만원 이하의 과태료가 부과될 수 있어요
              </span>
            </div>
          </div>
          <div className="content">
            <h1 className="content-header">등록 방법</h1>
          </div>
        </LicenseStyle>
      </ContentStyle>
    </>
  );
}