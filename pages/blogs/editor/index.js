import BaseLayout from "../../../components/layouts/BaseLayout";
import BasePage from "../../../components/BasePage";
import withAuth from "../../../hoc/withAuth";
import { useCreateBlog } from "../../../actions/blogs";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";

const BlogEditor = ({ user, loading }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const [createBlog, { data: createdBlog, error, clearError }] =
    useCreateBlog();

  const saveBlog = async (data) => {
    data = {
      content,
      subTitle,
      title,
    };
    const createdBlog = await createBlog(data);
    toast.success("Created");
    router.push("/blogs/editor/[id]", `/blogs/editor/${createdBlog._id}`);
  };

  if (error) {
    toast.error(error);
    clearError();
  }

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header="BlogEditor">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subtitle">SubTitle</label>
          <input
            name="subtitle"
            type="text"
            className="form-control"
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            type="text"
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            rows="15"
            cols="15"
          />
        </div>
        <button className="btn btn-success" type="button" onClick={saveBlog}>
          Create Blog
        </button>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogEditor)("admin");
