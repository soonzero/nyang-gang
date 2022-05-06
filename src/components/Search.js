import React from "react";
import { SearchStyle } from "./styled";

export default function Search(props) {
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

  return (
    <SearchStyle>
      <div className="search-container">
        <div className="select">
          <select className="selection city" onChange={props.selectCity}>
            <option>지역을 선택하세요</option>
            {cities.map((city) => {
              return (
                <option key={city.code} id={city.name}>
                  {city.name} - {city.code}
                </option>
              );
            })}
          </select>
          <select className="selection num" onChange={props.selectNumber}>
            <option name="10">10개씩 보기</option>
            <option name="20">20개씩 보기</option>
            <option name="50">50개씩 보기</option>
            <option name="100">100개씩 보기</option>
          </select>
        </div>
      </div>
    </SearchStyle>
  );
}
