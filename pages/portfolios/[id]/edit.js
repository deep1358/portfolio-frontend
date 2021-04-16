import BaseLayout from "../../../components/layouts/BaseLayout";

import BasePage from "../../../components/BasePage";
import { toast } from "react-toastify";
import withAuth from "../../../hoc/withAuth";
import { useRouter } from "next/router";
import {
  useGetPortfolio,
  useUpdatePortfolio,
} from "../../../actions/portfolios";
import PortfolioForm from "../../../components/PortfolioForm";
import { Col, Row } from "reactstrap";

const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const { data: initialData } = useGetPortfolio(router.query.id);

  const _updatePortfolio = async (data) => {
    // console.log(data);
    try {
      await updatePortfolio(router.query.id, data);
      toast.success("Portfolio has been updated!", {
        autoClose: 2000,
      });
    } catch (e) {
      // console.log(e);
      // toast.error("Oops some error!", {
      //   autoClose: 2000,
      // });
    }
  };
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage header="Edit Portfolio">
        <Row>
          <Col md="8">
            {initialData && (
              <PortfolioForm
                onSubmit={_updatePortfolio}
                initialData={initialData}
              />
            )}
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(PortfolioEdit)("admin");
