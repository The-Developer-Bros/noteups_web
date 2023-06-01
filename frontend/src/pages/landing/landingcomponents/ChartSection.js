import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import chart from "../img/chart.svg";
import { InnerLayout } from "../styles/Layouts";
import AnimatedButton from "./AnimatedButton";
import ChartStats from "./ChartStats";

function ChartSection() {
  return (
    <ChartStyled>
      <InnerLayout>
        <div className="chart-con">
          <div className="chart-left">
            <div className="stats">
              <div className="stats-progress">
                <ChartStats name={"Days Streak"} amount={17} />
                <ChartStats name={"Exercises Completed"} amount={5} />
              </div>
              <img src={chart} alt="" />
            </div>
          </div>
          <div className="chart-right">
            <h2 className="secondary-heading">
              Manage your progress on exercises and quizzes
            </h2>
            <motion.p
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              You can track your progress on exercises and quizzes and see how
              you are doing. You can also see your progress on your exercises
              and quizzes.
            </motion.p>
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <AnimatedButton name={"Explore Products"} />
            </motion.div>
          </div>
        </div>
      </InnerLayout>
    </ChartStyled>
  );
}

const ChartStyled = styled.section`
  .chart-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media screen and (max-width: 1347px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .chart-left {
      width: 100%;
      @media screen and (max-width: 1347px) {
        width: 100%;
      }
      .stats {
        img {
          box-shadow: 0px 25px 50px rgba(22, 25, 79, 0.05);
          border-radius: 62px;
          width: 100%;
        }
        .stats-progress {
          display: flex;
          padding-bottom: 1.3rem;
          justify-content: space-between;
        }
      }
    }

    .chart-right {
      margin: 2rem;
      padding-left: 2rem;
      p {
        padding: 1.3rem 0;
      }
    }
  }
`;

export default ChartSection;
