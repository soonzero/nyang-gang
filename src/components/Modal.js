import axios from "axios";
import React, { useState, useEffect } from "react";
import { ReactComponent as Exit } from "images/exit-modal.svg";
import { ModalStyle } from "./styled";
import Loading from "./Loading";
import Kakaomap from "./Kakaomap";

export default function Modal(props) {
  let didCancel = false;
  const API_KEY = process.env.REACT_APP_PUB_DATA_API_KEY;
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

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [display, setDisplay] = useState();
  const [selected, setSelected] = useState();
  const [currentPosition, setCurrentPosition] = useState();
  const [center, setCenter] = useState();

  const getData = async () => {
    didCancel = false;
    setIsLoading(true);
    if (props.choice == "gov") {
      try {
        const result = await axios({
          method: "GET",
          url: `https://openapi.gg.go.kr/GovernmentOffice?KEY=${API_KEY}&Type=json&pIndex=1&pSize=1000`,
        });
        const filtered = await result.data.GovernmentOffice[1].row.filter(
          (data) => data.DIV_NM.includes("시청") || data.DIV_NM.includes("군청")
        );
        if (!didCancel) {
          setData(filtered);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (props.choice == "agency") {
      try {
        let agencies = [];
        for (let i = 0; i < 2; i++) {
          const url = `https://openapi.gg.go.kr/AnimalRegistActing?KEY=${API_KEY}&Type=json&pIndex=${
            i + 1
          }&pSize=1000`;
          const agenciesArray = await axios({
            method: "GET",
            url: url,
          });
          agencies = [
            ...agencies,
            ...agenciesArray.data.AnimalRegistActing[1].row,
          ];
        }
        if (!didCancel) {
          setData(agencies);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const filterData = async (keyword) => {
    const result = await data.filter((d) => d.SIGUN_NM == keyword);
    setDisplay(result);
    if (props.choice == "gov") {
      if (result.length > 0) {
        setCenter({
          lat: result[0].REFINE_WGS84_LAT,
          lon: result[0].REFINE_WGS84_LOGT,
        });
      } else {
        alert("화성시에 대한 정보가 아직 없어요!");
      }
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
    getData();
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    document.body.style.overflow = "hidden";
    return () => {
      didCancel = true;
      document.body.style.overflow = "unset";
    };
  }, []);

  const select = (event) => {
    setSelected(event.target.innerText);
    filterData(event.target.innerText);
  };

  return (
    <>
      <ModalStyle>
        {!isLoading ? (
          <div className="container">
            <h2 className="header">
              {props.choice == "gov" ? "시군구청" : "등록대행업체"} 선택
              <span className="exit" onClick={() => props.setModal(false)}>
                <Exit />
              </span>
            </h2>
            <ul className="sigun-container">
              {cities.map((city) => {
                return (
                  <li
                    className={`sigun ${
                      selected == city.name ? "selected" : ""
                    }`}
                    onClick={select}
                  >
                    <span>{city.name}</span>
                  </li>
                );
              })}
            </ul>
            {display && props.choice == "agency" && (
              <ul className="lists agency">
                {display.length > 0 ? (
                  display
                    .filter((i) => !i.DETAIL_TELNO.includes("*"))
                    .map((d) => {
                      return (
                        <div className="list">
                          <span>{d.ENTRPS_NM}</span>
                          <a href={`${`tel:${d.DETAIL_TELNO}`}`}>
                            {d.DETAIL_TELNO}
                          </a>
                        </div>
                      );
                    })
                ) : (
                  <li className="list">검색된 결과가 없어요 😭</li>
                )}
              </ul>
            )}
            {display && props.choice == "gov" && (
              <div className="lists gov">
                <div className="map-container">
                  <Kakaomap
                    modal
                    data={display}
                    center={center}
                    currentPosition={currentPosition}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="container">
            <Loading modal />
          </div>
        )}
      </ModalStyle>
    </>
  );
}
