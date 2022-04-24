import React, { useState, useEffect } from "react";
import { SearchStyle, ContentStyle } from "./styled";
import Navbar from "./Navbar";
import Kakaomap from "./Kakaomap";
import axios from "axios";
import List from "./List";

export default function Hospital(props) {
  const API_KEY = `82746026163943658399e99638d6ece0`;
  const cities = [
    { name: "가평군", code: 41820 },
    { name: "고양시", code: 41280 },
    { name: "과천시", code: 41290 },
    { name: "광명시", code: 41210 },
    { name: "광주시", code: 41610 },
    { name: "구리시", code: 41310 },
    { name: "군포시", code: 41410 },
    { name: "김포시", code: 41570 },
    { name: "남양주시", code: 41360 },
    { name: "동두천시", code: 41250 },
    { name: "부천시", code: 41190 },
    { name: "성남시", code: 41130 },
    { name: "수원시", code: 41110 },
    { name: "시흥시", code: 41390 },
    { name: "안산시", code: 41270 },
    { name: "안성시", code: 41550 },
    { name: "안양시", code: 41170 },
    { name: "양주시", code: 41630 },
    { name: "양평군", code: 41830 },
    { name: "여주시", code: 41670 },
    { name: "연천군", code: 41800 },
    { name: "오산시", code: 41370 },
    { name: "용인시", code: 41460 },
    { name: "의왕시", code: 41430 },
    { name: "의정부시", code: 41150 },
    { name: "이천시", code: 41500 },
    { name: "파주시", code: 41480 },
    { name: "평택시", code: 41220 },
    { name: "포천시", code: 41650 },
    { name: "하남시", code: 41450 },
    { name: "화성시", code: 41590 },
  ];
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [city, setCity] = useState();
  const [number, setNumber] = useState(10);
  const [currentPosition, setCurrentPosition] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("accessToken") &&
      sessionStorage.getItem("uid")
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    getHospitals();
  }, []);

  const selectCity = (event) => {
    const string = event.target.value;
    const code = string.replace(/^\D+/g, "");
    setCity(code);
  };

  const selectNumber = (event) => {
    const number = parseInt(event.target.value);
    setNumber(number);
  };

  const getHospitals = async () => {
    try {
      let hospitals = [];
      for (let i = 0; i < 3; i++) {
        const url = `https://openapi.gg.go.kr/Animalhosptl?KEY=${API_KEY}&Type=json&pIndex=${
          i + 1
        }&pSize=${1000}`;
        const hospitalArray = await axios({
          method: "GET",
          url: url,
        });
        hospitals = [...hospitals, ...hospitalArray.data.Animalhosptl[1].row];
      }
      setData(hospitals.filter((hospital) => hospital.BSN_STATE_NM == "정상"));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onGeoOk = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setCurrentPosition({
      lat: lat,
      lon: lon,
    });
  };

  const onGeoError = () => {
    alert("위치를 찾을 수 없어요!");
  };

  useEffect(() => {
    setNumber(number);
    setCity(city);
  }, [city, number]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <SearchStyle>
        <div className="search-container">
          <div className="select">
            <select className="selection city" onChange={selectCity}>
              <option>지역을 선택하세요</option>
              {cities.map((city) => {
                return (
                  <option key={city.code} id={city.name}>
                    {city.name} - {city.code}
                  </option>
                );
              })}
            </select>
            <select className="selection num" onChange={selectNumber}>
              <option name="10">10개씩 보기</option>
              <option name="20">20개씩 보기</option>
              <option name="50">50개씩 보기</option>
              <option name="100">100개씩 보기</option>
            </select>
            {/* <button
              type="button"
              className="button"
              onClick={() => props.setRoad(!props.road)}
            >
              {props.road ? "도로명 > 지번" : "지번 > 도로명"}
            </button>
            <button
              type="button"
              className="button"
              onClick={() => props.setClosed((prev) => !prev)}
            >
              {props.closed ? "폐업 포함하기" : "폐업 제외하기"}
            </button> */}
          </div>
        </div>
      </SearchStyle>
      {!isLoading ? (
        <ContentStyle>
          <div className="content-container">
            <Kakaomap data={data} currentPosition={currentPosition} />
            <List
              data={data}
              isLoading={isLoading}
              city={city}
              number={number}
            />
          </div>
        </ContentStyle>
      ) : (
        <ContentStyle>
          <div className="loading-text">
            🐱 목록을 불러오고 있어요! 조금만 기다려주세요! 🐶
          </div>
        </ContentStyle>
      )}
    </>
  );
}
