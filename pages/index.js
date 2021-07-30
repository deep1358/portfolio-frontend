import BaseLayout from "../components/layouts/BaseLayout";
import { Container, Row, Col } from "reactstrap";
import BasePage from "../components/BasePage";
import Typed from "react-typed";
import { useGetUser } from "../actions/user";
import { useEffect, useRef, useState } from "react";

const roles = ["Web Developer", "Tech Lover", "Team Player"];

const Home = () => {
  const { data, loading } = useGetUser();

  const [isFlipping, setIsFlipping] = useState(false);

  const flipInterval = useRef();

  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((pre) => !pre);
    }, 3000);
  };

  return (
    <>
      <BaseLayout
        user={data}
        loading={loading}
        className={`cover ${isFlipping ? "cover-orange" : "cover-blue"}`}
        navClass="transparent"
      >
        <BasePage indexPage title="Portfolio - Deep Shah">
          <div className="main-section">
            <div className="background-image">
              <img src="/images/background-index.png" />
            </div>
            <Container>
              <Row>
                <Col md="6">
                  <div className="hero-section">
                    <div
                      className={`flipper ${isFlipping ? "isFlipping" : ""}`}
                    >
                      <div className="front">
                        <div className="image image-1">
                          <div className="hero-section-content">
                            <h2> Full Stack Web Developer </h2>
                            <div className="hero-section-content-intro">
                              Have a look at my portfolio and job history.
                            </div>
                          </div>
                        </div>

                        <div className="shadow-custom">
                          <div className="shadow-inner"> </div>
                        </div>
                      </div>
                      <div className="back">
                        <div className="image image-2">
                          <div className="hero-section-content">
                            <h2> Full Stack Web Developer </h2>
                            <div className="hero-section-content-intro">
                              Web Developer ready for Projects of any type.
                            </div>
                          </div>
                        </div>
                        <div className="shadow-custom-orange">
                          <div className="shadow-inner"> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="6" className="hero-welcome-wrapper">
                  <div className="hero-welcome-text">
                    <h1>
                      Welcome to the portfolio website of Deep Shah. Get
                      informed, collaborate and discover projects I was working
                      on through the years!
                    </h1>
                  </div>
                  <Typed
                    loop
                    typeSpeed={50}
                    backSpeed={50}
                    strings={roles}
                    backDelay={1000}
                    loopCount={0}
                    showCursor
                    className="self-typed"
                    cursorChar="|"
                  />
                  <div className="hero-welcome-bio">
                    <h1>Let's take a look on my work.</h1>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default Home;
