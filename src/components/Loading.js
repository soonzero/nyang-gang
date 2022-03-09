import React from "react";
import styled from "styled-components";

const StLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  & h1 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

export default function Loading() {
  return (
    <StLoadingContainer>
      <h1>데이터 불러오는 중...</h1>
    </StLoadingContainer>
  );
}
