import axios from "axios";
import React, { useEffect, useState } from "react";
import { ContentStyle } from "../components/styled";
import Navbar from "../components/Navbar";
import Kakaomap from "../components/Kakaomap";
import List from "../components/List";
import Search from "components/Search";
import Loading from "components/Loading";

export default function Pharmacy() {
  let didCancel = false;
  const API_KEY = process.env.REACT_APP_PUB_DATA_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [data, setData] = useState();
  const [city, setCity] = useState();
  const [number, setNumber] = useState(10);
  const [currentPosition, setCurrentPosition] = useState();
  const [center, setCenter] = useState();

  const selectCity = (event) => {
    const string = event.target.value;
    const code = string.replace(/^\D+/g, "");
    setCity(code);
  };

  const selectNumber = (event) => {
    const number = parseInt(event.target.value);
    setNumber(number);
  };

  useEffect(() => {
    setNumber(number);
    setCity(city);
  }, [city, number]);

  const getData = async () => {
    try {
      let pharmacyArray = [];
      for (let i = 0; i < 4; i++) {
        const url = `https://openapi.gg.go.kr/AnimalPharmacy?KEY=${API_KEY}&Type=json&pIndex=${
          i + 1
        }&pSize=1000`;
        const result = await axios({
          method: "GET",
          url: url,
        });
        pharmacyArray = [
          ...pharmacyArray,
          ...result.data.AnimalPharmacy[1].row,
        ];
      }
      if (!didCancel) {
        setData(pharmacyArray.filter((p) => p.BSN_STATE_NM == "정상"));
        setIsLoading(false);
      }
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
    setMapReady(true);
  };

  const onGeoError = () => {
    alert(
      `위치 정보를 불러올 수 없어요😭
경기도청을 지도의 중심으로 설정할게요`
    );
    setMapReady(true);
  };

  const getCurrentPosition = async () => {
    setMapReady(false);
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    getData();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <>
      <Navbar />
      <Search selectNumber={selectNumber} selectCity={selectCity} />
      <ContentStyle>
        {!isLoading && mapReady ? (
          <>
            <div className="content-container">
              <Kakaomap
                pharmacy
                data={data}
                center={center}
                currentPosition={currentPosition}
              />
              <List
                hospital
                data={data}
                isLoading={isLoading}
                city={city}
                number={number}
                setCenter={setCenter}
              />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </ContentStyle>
    </>
  );
}
