import BaseLayout from "../../../components/layouts/BaseLayout";
import moment from "moment";
import { useRouter } from "next/router";
import BasePage from "../../../components/BasePage";
import { useGetUser } from "../../../actions/user";
import PortfolioApi from "../../../lib/api/portfolios";

const portfolio = ({ portfolio }) => {
  const router = useRouter();
  const { data, loading } = useGetUser();

  return (
    <BaseLayout navClass="transparent" user={data} loading={loading}>
      <BasePage
        noWrapper
        indexPage
        metaDescription={portfolio.description}
        title={`${portfolio.title} - Deep Shah`}
      >
        <div className="portfolio-detail">
          <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" class="inner page-cover">
              <h1 class="cover-heading">{portfolio.title}</h1>
              <p class="lead dates">
                {moment(portfolio.startDate).format("LL")} -
                {portfolio.endDate
                  ? moment(portfolio.endDate).format("LL")
                  : "Present"}
              </p>
              <p class="lead info mb-0">
                {portfolio.jobTitle} | {portfolio.company} |{portfolio.location}
              </p>
              <p class="lead">{portfolio.description}</p>
              <p class="lead">
                <a
                  href={portfolio.companyWebsite}
                  target="_blank"
                  class="btn btn-lg btn-secondary"
                >
                  Visit Company
                </a>
              </p>
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default portfolio;

// export const getServerSideProps = async ({ query }) => {
//   const json = await new PortfolioApi().getById(query.id);
//   const portfolio = json.data;

//   return {
//     props: {
//       portfolio,
//     },
//   };
// };

export const getStaticPaths = async () => {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  const paths = portfolios.map((portfolio) => {
    return {
      params: { id: portfolio._id },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;

  return {
    props: {
      portfolio,
    },
  };
};
