import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";
import { useGetUser } from "../../actions/user";
import BlogApi from "../../lib/api/blogs";
import { Col, Row } from "reactstrap";

import Avatar from "../../components/shared/Avatar";

const BlogDetail = ({ blog, author }) => {
  const { data, error, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        metaDescription={blog.subTitle}
        title={`${blog.title} - Deep Shah`}
      >
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Avatar
              image={author.picture}
              title={author.name}
              date={blog.createdAt}
            />
            <hr />
            <h1>{blog.title}</h1>
            <h2>{blog.subTitle}</h2>
            <p>{blog.content}</p>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default BlogDetail;

export async function getStaticPaths() {
  const { data } = await new BlogApi().getAll();
  // const blogs = json.data;
  const paths = data.map(({ blog }) => ({ params: { slug: blog.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const {
    data: { blog, author },
  } = await new BlogApi().getBySlug(params.slug);
  return { props: { blog, author } };
}
