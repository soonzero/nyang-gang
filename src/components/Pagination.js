import React from "react";
import styled from "styled-components";

const StPagination = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;

  & ol {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & ol li {
    padding: 8px 12px;
    cursor: pointer;
    border: 1px solid #e1e4e8;
    border-right: 0;
    background-color: white;
  }

  & ol li:last-child {
    border-right: 1px solid #e1e4e8;
  }
`;

export default function Pagination(props) {
  let pages;
  if (props.data.length % 10 > 0) {
    pages = props.data.length / 10 + 1;
  } else {
    pages = props.data.length / 10;
  }

  const pageArray = [];
  for (let i = 1; i < pages; i++) {
    pageArray.push(i);
  }

  const pageElements = pageArray.map((page) => {
    return (
      <li key={page} onClick={() => props.setPage(page)}>
        {page}
      </li>
    );
  });

  return (
    <StPagination>
      <ol>
        <li>Prev</li>
        {pageElements}
        <li>Next</li>
      </ol>
    </StPagination>
  );
}
