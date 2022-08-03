import React from "react";
import styled from "styled-components";

function Card({
  account,
  amount,
  text,
  button,
  cardImage,
  active,
  inactive,
  check,
  checkDis,

  checkedText,
  uncheckedText,
}) {
  return (
    <CardStyled>
      <h4 className="card-title">{account}</h4>
      <h4 className="card-title">
        {amount} <span>/ m</span>
      </h4>
      <p className="c-para">{text}</p>
      <div className="button-con">
        <button>{button}</button>
      </div>
      <div className="card-image-con">
        <img src={cardImage} alt="" />
      </div>
      <div className="plan-con">
        <img src={active} alt="" />
        <img src={inactive} alt="" />
      </div>
      <div className="list-con">
        {/* Use a map for checked and unchecked features */}
        {checkedText.map((text, index) => (
          <p className="text-check" key={index}>
            <img src={check} alt="" />
            {text}
          </p>
        ))}
        {uncheckedText.map((text, index) => (
          <p className="text-unchecked" key={index}>
            <img src={checkDis} alt="" />
            {text}
          </p>
        ))}
      </div>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  background-color: white;
  padding: 3rem 4rem;
  border-radius: 50px;
  box-shadow: 0px 25px 50px rgba(22, 25, 79, 0.05);
  .card-title {
    font-size: 2.5rem;
    color: #000;
    text-align: center;
    padding: 1.5rem 0;
    span {
      font-size: 1.5rem;
    }
  }

  .button-con {
    text-align: center;
    padding: 1.5rem 0;
    button {
      border: 2px solid #16194f;
      padding: 0.8rem 1.8rem;
      outline: none;
      cursor: pointer;
      background: transparent;
      border-radius: 20px;
      font-size: inherit;
      color: #16194f;
    }
  }

  .card-image-con {
    display: flex;
    justify-content: center;
    img {
      width: 70%;
    }
  }

  .plan-con {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0;
    img {
      padding: 0 0.3rem;
    }
  }

  .text-check {
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    img {
      padding-right: 0.3rem;
      width: 24px;
    }
  }

  .text-unchecked {
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    color: #b7b7b7;
    img {
      padding-right: 0.3rem;
      width: 24px;
    }
  }
`;
export default Card;
