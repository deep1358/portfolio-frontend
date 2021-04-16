import Link from "next/link";
import { Container, Row } from "reactstrap";

const Masthead = ({ bgImage, children }) => {
  return (
    <div className="masthead" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay"></div>
      <Container>
        <Row>
          <div className="col-lg-8 col-md-10 mx-auto">{children}</div>
        </Row>
      </Container>
    </div>
  );
};

export default Masthead;
