import axios from "axios";
import Animals from "components/Animals";
import Navbar from "components/Navbar";
import { ContentStyle } from "components/styled";
import React, { useState, useEffect } from "react";

export default function Abandoned() {
  const API_KEY = process.env.REACT_APP_PUB_DATA_API_KEY;
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("accessToken") &&
      sessionStorage.getItem("uid")
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = () => {
        if (today.getMonth() + 1 < 10) {
          return `0${today.getMonth() + 1}`;
        } else {
          return today.getMonth() + 1;
        }
      };
      const day = today.getDate();
      const date = `${year}${month()}${day}`;
      let animals = [];
      for (let i = 0; i < 2; i++) {
        const url = `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=${API_KEY}&Type=json&pIndex=${
          i + 1
        }&pSize=1000&STATE_NM=보호중`;
        const animalsArray = await axios({
          method: "GET",
          url: url,
        });
        animals = [...animals, ...animalsArray.data.AbdmAnimalProtect[1].row];
      }
      setData(animals.filter((a) => a.PBLANC_END_DE >= date));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {!isLoading ? (
        <ContentStyle>
          <Animals data={data} />
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
