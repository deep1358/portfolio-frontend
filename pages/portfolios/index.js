import Link from "next/link";
import PortfolioApi from "../../lib/api/portfolios";
import BasePage from "../../components/BasePage";
import BaseLayout from "../../components/layouts/BaseLayout";
import { useGetUser } from "../../actions/user";
import { Row, Col, Button } from "reactstrap";
import PortfolioCard from "../../components/PortfolioCard";
import { useRouter } from "next/router";
import { isAuthorized } from "../../utils/auth0";
import { useDeletePortfolio } from "../../actions/portfolios";
import { useState } from "react";

const Portfolios = ({ portfolios: initialPortfolios }) => {
  const [portfolios, setPortfolios] = useState(initialPortfolios);

  const router = useRouter();
  const { data, error, loading } = useGetUser();
  const [deletPortfolio, { data: deleteData }] = useDeletePortfolio();

  const _deletePortfolio = async (e, id) => {
    e.stopPropagation();
    const isConfirm = confirm(
      "Are you sure you want to delete this portfolio?"
    );
    if (isConfirm) {
      await deletPortfolio(id);
    }
    const newPortfolios = portfolios.filter(
      (portfolio) => portfolio._id !== id
    );
    setPortfolios(newPortfolios);
  };

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage className="portfolio-page" header="Portfolios" title="Newest portfolios - Deep Shah">
        <Row>
          {portfolios.map((portfolio) => (
            <Col
              md="4"
              key={portfolio._id}
              onClick={() => {
                router.push("/portfolios/[id]", `/portfolios/${portfolio._id}`);
              }}
            >
              <PortfolioCard portfolio={portfolio}>
                {data && isAuthorized(data, "admin") && (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          "/portfolios/[id]/edit",
                          `/portfolios/${portfolio._id}/edit`
                        );
                      }}
                      color="warning"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => _deletePortfolio(e, portfolio._id)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </PortfolioCard>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Portfolios;

export const getStaticProps = async () => {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  return {
    props: {
      portfolios,
      
    },
    revalidate:1
  };
};
