import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import lines from "../img/lines.svg";
import questions from "../questions";
import Question from "./Question";
function FAQSection() {
  return (
    <FaqStyled>
      <InnerLayout>
        <h3 className="small-heading">
          Frequently <span>asked questions</span>
        </h3>
        <p className="c-para">
          These are the most frequently asked questions about the platform. If
          you have any other questions, feel free to contact us. You can also
          reach us through the contact form.
        </p>
        <div className="lines">
          <img src={lines} alt="" />
        </div>

        <div className="questions-con">
          {questions.map((q) => {
            return <Question key={q.id} {...q} />;
          })}
        </div>
      </InnerLayout>
    </FaqStyled>
  );
}

const FaqStyled = styled.section`
  .c-para {
    width: 60%;
    margin: 0 auto;
  }
  .questions-con {
    padding-top: 4rem;
  }
  .lines {
    position: fixed;
    bottom: 0;
    left: 0;
    /* top: 300%; */
    width: 100%;
    z-index: -1;
    img {
      width: 100%;
    }
  }
`;

export default FAQSection;
