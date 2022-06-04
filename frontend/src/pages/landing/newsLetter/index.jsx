import React from "react";
import styled from "styled-components";
import { Details } from "./details";
import { SideImage } from "./sideImage";

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 26px;
  position: relative;
  border: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  align-items: center;
  justify-content: center;
`;

export function NewsLetter(props) {
  return (
    <CardContainer>
      <Details />
      <SideImage />
    </CardContainer>
  );
}
