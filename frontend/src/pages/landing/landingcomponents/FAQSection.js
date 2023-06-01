import React from "react";
import styled from "styled-components";
import lines from "../img/lines.svg";
import questions from "../questions";
import { InnerLayout } from "../styles/Layouts";
import Question from "./Question";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function FAQSection() {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedId(questions[0].id);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id) => {
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

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
          <AnimatePresence initial={false}>
            {questions.map((q) => (
              <motion.div
                layout
                key={q.id}
                onClick={() => handleSelect(q.id)}
                className="question"
              >
                <Question
                  key={q.id}
                  id={q.id}
                  title={q.title}
                  description={q.description}
                  isSelected={selectedId === q.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
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
