import React from "react";
import { ReactComponent as Prev } from "images/prev.svg";
import { ReactComponent as Next } from "images/next.svg";

export default function Pagination(props) {
  let pages;
  if (props.data) {
    if (props.data.length % parseInt(props.number) > 0) {
      pages = Math.floor(props.data.length / parseInt(props.number)) + 1;
    } else {
      pages = props.data.length / parseInt(props.number);
    }
  }

  const changePage = (event) => {
    if (event.target.getAttribute("name") == "prev") {
      props.setPage((prev) => prev - 1);
    } else if (event.target.getAttribute("name") == "next") {
      props.setPage((prev) => prev + 1);
    }
  };

  return (
    <ol className="pagination">
      {props.data && pages != 1 && (
        <>
          {props.page > 1 && (
            <li name="prev" className="prev" onClick={changePage}>
              <Prev />
            </li>
          )}
          {props.page < pages && (
            <li name="next" className="next" onClick={changePage}>
              <Next />
            </li>
          )}
        </>
      )}
    </ol>
  );
}
