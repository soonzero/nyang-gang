import React from "react";
import axios from "axios";
import Kakaomap from "./Kakaomap";
import Search from "../components/Search";
import List from "../components/List";
import styled from "styled-components";

const StContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100vw;
  height: 100vh;
`;

const StGridLeft = styled.div`
  padding: 20px 40px;
  position: relative;
  overflow: hidden;
  min-width: 550px;
`;

export default function Home() {
  const API_KEY = `82746026163943658399e99638d6ece0`;
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [markers, setMarkers] = React.useState(undefined);
  const [center, setCenter] = React.useState({
    lat: undefined,
    lon: undefined,
  });

  const [city, setCity] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [road, setRoad] = React.useState(true);
  const [closed, setClosed] = React.useState(true);
  const [display, setDisplay] = React.useState(null);

  const getCoordinates = (lat, lon) => {
    setCenter({
      lat: lat,
      lon: lon,
    });
  };

  const getMarkers = (items) => {
    const positions = [];
    items.map((item) => {
      positions.push({
        lat: item.REFINE_WGS84_LAT,
        lon: item.REFINE_WGS84_LOGT,
      });
    });
    setMarkers(positions);
  };

  React.useEffect(() => {
    getHospital();
  }, [city]);

  const getHospital = async () => {
    try {
      const hospital = [];
      const url = `https://openapi.gg.go.kr/Animalhosptl?KEY=${API_KEY}&Type=json&pIndex=1&pSize=${1000}`;
      await axios
        .get(url)
        .then((e) => hospital.push(...e.data.Animalhosptl[1].row));
      setData(hospital);
      setDisplay(hospital);
      getMarkers(hospital);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StContainer>
      <StGridLeft>
        <Search
          setCity={setCity}
          road={road}
          setRoad={setRoad}
          closed={closed}
          setClosed={setClosed}
        />
        <List
          data={display}
          loading={isLoading}
          setCenter={getCoordinates}
          city={city}
          road={road}
          page={page}
          setPage={setPage}
          closed={closed}
          setDisplay={setDisplay}
        />
      </StGridLeft>
      <div className="gridright">
        <Kakaomap data={data} center={center} markers={markers} />
      </div>
    </StContainer>
  );
}
