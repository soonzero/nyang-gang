import React from "react";
import Loading from "./Loading";
import styled from "styled-components";

const StListBox = styled.div`
  margin-bottom: 40px;
  overflow: scroll;
  padding: 20px 20px 0;
  height: calc(100% - 186px);

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
`;

const StList = styled.li`
  padding: 20px;
  cursor: pointer;
  color: ${(props) => (props.contents.BSN_STATE_NM == "폐업" ? "red" : "#555")};
  font-weight: ${(props) =>
    props.contents.BSN_STATE_NM == "폐업" ? "300" : "500"};
  border: 3px solid #f5f5f5;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 100ms ease-out;

  &:hover {
    border-color: rgba(245, 121, 119, 0.7);
    transform: scale(1.02);
    box-shadow: 0 0 8px 16px rgb(0 0 0 / 5%);
  }

  & > div:first-child {
    margin-bottom: 12px;
  }

  & > div:nth-child(2) {
    margin-bottom: 8px;
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
          <div>
            {d.BSN_STATE_NM == "폐업" ? "(폐업)" : null} {d.BIZPLC_NM}
          </div>
          <div>
            {props.road ? `${d.REFINE_ROADNM_ADDR}` : `${d.REFINE_LOTNO_ADDR}`}
          </div>
          <div>
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
    <StListBox>
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
    </StListBox>
  );
}
