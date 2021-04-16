import BaseLayout from "../../../components/layouts/BaseLayout";
import BasePage from "../../../components/BasePage";
import withAuth from "../../../hoc/withAuth";
// import {Editor} from "slate-simple-editor"
import { useCreateBlog } from "../../../actions/blogs";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";

const BlogEditor = ({ user, loading }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const [createBlog, { data: createdBlog, error,clearError }] = useCreateBlog();

  const saveBlog = async (data) => {
    data = {
      content,
      subTitle,
      title,
    };
    const createdBlog = await createBlog(data);
    router.push("/blogs/editor/[id]", `/blogs/editor/${createdBlog._id}`);
  };

  if (error) {
    toast.error(error);
    clearError();
  }

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header="BlogEditor">
        <input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          value={subTitle}
          placeholder="SubTitle"
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <textarea
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          col="10"
        />
        <button onClick={saveBlog}>Create Blog</button>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogEditor)("admin");
