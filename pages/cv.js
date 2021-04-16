import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import { useGetUser } from "../actions/user";
import { Col, Row } from "reactstrap";
const Cv = () => {
  const { data, error, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage title="My Experiences - Deep Shah">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <iframe style={{ width: "100%", height: "800px" }} src="/cv.pdf" />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Cv;
