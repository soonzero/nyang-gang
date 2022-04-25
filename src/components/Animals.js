import React from "react";
import { AnimalsStyle } from "./styled";

export default function Animals(props) {
  return (
    <AnimalsStyle>
      <div className="list-container">
        {props.data.map((a) => {
          return (
            <div className="list">
              <div
                className="img-container"
                style={{
                  backgroundImage: `url(${a.IMAGE_COURS})`,
                }}
              ></div>
              <div className="desc-container">
                <p className="desc reception-date">
                  {a.RECEPT_DE.substring(0, 4)}-{a.RECEPT_DE.substring(4, 6)}-
                  {a.RECEPT_DE.substring(6, 8)}
                </p>
                <p className="desc discovery-place">
                  발견 위치: 경기도 {a.SIGUN_NM} {a.DISCVRY_PLC_INFO}
                </p>
                <p className="desc species">품종: {a.SPECIES_NM}</p>
                <p className="desc color">털색: {a.COLOR_NM}</p>
                <p className="desc age">{a.AGE_INFO}</p>
                <p className="desc weight">체중: {a.BDWGH_INFO}</p>
                <p className="desc sex">
                  성별: {a.SEX_NM == "F" ? "암컷" : "수컷"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AnimalsStyle>
  );
}
