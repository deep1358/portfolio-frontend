import BasePage from "../../components/BasePage";
import BaseLayout from "../../components/layouts/BaseLayout";
import { useGetUser } from "../../actions/user";
import { Col, Row } from "reactstrap";
import Link from "next/link";
import Masthead from "../../components/shared/Masthead";
import BlogApi from "../../lib/api/blogs";
import Blogitem from "../../components/Blogitem";

const Blog = ({ blogs }) => {
  const { data, error, loading } = useGetUser();
  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={data}
      loading={loading}
    >
      <Masthead bgImage="/images/home-bg.jpg">
        <div className="site-heading">
          <h1>Fresh Blogs</h1>
          <span className="subheading">Programming...</span>
        </div>
      </Masthead>
      <BasePage className="blog-body" title="Newest Blogs - Deep Shah" >
        <Row>
          {blogs.map((blog) => (
            <Col key={blog._id} md="10" lg="8" className="mx-auto">
              <Blogitem blog={blog} />
              <hr></hr>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data } = await new BlogApi().getAll();
  const blogs = data.map((i) => ({ ...i.blog, author: i.author }));
  return { props: { blogs }, revalidate: 1 };
}

export default Blog;
