import BaseLayout from "../../../components/layouts/BaseLayout";
import BasePage from "../../../components/BasePage";
import withAuth from "../../../hoc/withAuth";
// import {Editor} from "slate-simple-editor"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useGetBlog, useUpdateBlog } from "../../../actions/blogs";
import { useRouter } from "next/router";

const BlogUpdateEditor = ({ user, loading }) => {
  const router = useRouter();

  const { data, error } = useGetBlog(router.query.id);
  const [
    updateBlog,
    {
      data: updatedBlogData,
      error: updatedBlogError,
      loading: updatedBlogLoading,
    },
  ] = useUpdateBlog();

  const [title, setTitle] = useState(data ? data.title : "");
  const [subTitle, setSubTitle] = useState(data ? data.subTitle : "");
  const [content, setContent] = useState(data ? data.content : "");

  useEffect(() => {
    setTitle(data?.title);
    setContent(data?.content);
    setSubTitle(data?.subTitle);
  }, [data]);

  const _updateBlog = async () => {
    var d = {
      title,
      subTitle,
      content,
    };
    await updateBlog(router.query.id, d);
    debugger;
    toast.success("Updated");
  };

  if (updatedBlogError) {
    toast.error(updatedBlogError);
  }

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header="BlogUpdateEditor">
        {data && data.content && (
          <>
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
            <button onClick={_updateBlog}>Update Blog</button>
          </>
        )}
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogUpdateEditor)("admin");
