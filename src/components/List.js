import React from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";
import styled from "styled-components";
import style from "../components/css/List.module.css";

const StList = styled.li`
  padding: 20px;
  cursor: pointer;
  color: ${(props) =>
    props.contents.BSN_STATE_NM == "폐업" ? "red" : "inherit"};
  font-weight: ${(props) =>
    props.contents.BSN_STATE_NM == "폐업" ? "300" : "500"};
  border: 1.5px solid #ebebeb;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 100ms ease-out;

  &:hover {
    border-color: #717171;
    transform: scale(1.02);
    box-shadow: 0 0 8px 16px rgb(0 0 0 / 5%);
  }
`;

export default function List(props) {
  const filter = (list) => {
    const element = list.map((d) => {
      return (
        <StList
          contents={d}
          onClick={() =>
            props.setCenter(d.REFINE_WGS84_LAT, d.REFINE_WGS84_LOGT)
          }
        >
          <div className={style.name}>
            {d.BSN_STATE_NM == "폐업" ? "(폐업)" : null} {d.BIZPLC_NM}
          </div>
          <div className={style.addressRoad}>
            {props.road
              ? `[${d.REFINE_ZIP_CD}] ${d.REFINE_ROADNM_ADDR}`
              : `${d.REFINE_LOTNO_ADDR}`}
          </div>
          <div className={style.tel}>
            {d.LOCPLC_FACLT_TELNO ? `TEL : ${d.LOCPLC_FACLT_TELNO}` : null}
          </div>
        </StList>
      );
    });
    return element;
  };

  const displayFilteredItem = (code) => {
    if (props.closed) {
      let list = props.data.filter((d) => d.BSN_STATE_NM !== "폐업");
      if (code) {
        list = list.filter((d) => d.SIGUN_CD == code);
      }
      return filter(list);
    } else {
      let list = props.data;
      if (code) {
        list = list.filter((d) => d.SIGUN_CD == code);
      }
      return filter(list);
    }
  };

  return (
    <div className={style.lists}>
      {!props.loading ? (
        <>
          <ul>{displayFilteredItem(props.city)}</ul>
          {/* <Pagination
            data={displayFilteredItem(props.city)}
            onPage={props.page}
            setPage={props.setPage}
          /> */}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
