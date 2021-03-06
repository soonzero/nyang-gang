import axios from "axios";
import Kakaomap from "components/Kakaomap";
import Navbar from "components/Navbar";
import Search from "components/Search";
import React, { useState, useEffect } from "react";
import { ContentStyle } from "components/styled";
import List from "components/List";
import Loading from "components/Loading";

export default function Shelter() {
  let didCancel = false;
  const API_KEY = process.env.REACT_APP_PUB_DATA_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
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
      const result = await axios({
        method: "GET",
        url: `https://openapi.gg.go.kr/OrganicAnimalProtectionFacilit?KEY=${API_KEY}&Type=json&pIndex=1&pSize=1000`,
      });
      const response = result.data.OrganicAnimalProtectionFacilit[1].row.filter(
        (item) =>
          (item.CONTRACT_PERD == "직영" && item.SUM_YY == "2019") ||
          item.CONTRACT_PERD == "20191231"
      );
      if (!didCancel) {
        setData(response);
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
  };

  const onGeoError = () => {
    alert("위치를 찾을 수 없어요!");
  };

  useEffect(() => {
    getData();
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <>
      <Navbar />
      <Search selectNumber={selectNumber} selectCity={selectCity} />
      <ContentStyle>
        {!isLoading ? (
          <>
            <div className="content-container">
              <Kakaomap
                shelter
                data={data}
                center={center}
                currentPosition={currentPosition}
              />
              <List
                shelter
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
