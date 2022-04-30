import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimalsStyle } from "./styled";

export default function Animals(props) {
  const [page, setPage] = useState(1);

  const getList = (page) => {
    return props.data.slice(20 * (page - 1), 20 * page);
  };

  const [display, setDisplay] = useState(getList(1));

  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      setDisplay(display.concat(getList(page + 1)));
      setPage((prev) => prev + 1);
    }
  }, [page, display]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <AnimalsStyle>
      <div className="list-container">
        {display.map((a) => {
          return (
            <Link to={`/abandoned/${a.ABDM_IDNTFY_NO}`}>
              <div key={a.ABDM_IDNTFY_NO} className="list">
                <div
                  className="img-container"
                  style={{
                    backgroundImage: `url(${a.IMAGE_COURS})`,
                  }}
                ></div>
                <div className="desc-container">
                  <p className="desc reception-date">
                    등록 날짜: {a.RECEPT_DE.substring(0, 4)}년{" "}
                    {a.RECEPT_DE.substring(4, 6)}월{" "}
                    {a.RECEPT_DE.substring(6, 8)}일
                  </p>
                  <p className="desc discovery-place">
                    발견 위치: 경기도 {a.SIGUN_NM} {a.DISCVRY_PLC_INFO}
                  </p>
                  {/* <p className="desc species">품종: {a.SPECIES_NM}</p>
                  <p className="desc color">털색: {a.COLOR_NM}</p>
                  <p className="desc age">{a.AGE_INFO}</p>
                  <p className="desc weight">체중: {a.BDWGH_INFO}</p>
                  <p className="desc sex">
                    성별: {a.SEX_NM == "F" ? "암컷" : "수컷"}
                  </p> */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimalsStyle>
  );
}
