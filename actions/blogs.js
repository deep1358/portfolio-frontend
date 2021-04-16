import axios from "axios";
import { useApiHandler, fetcher } from ".";
import useSWR from "swr";

const createBlog = (data) => {
  return axios.post("/api/v1/blogs", data, { timeout: 10000 });
};
const updateBlog = (id, data) => {
  return axios.patch(`/api/v1/blogs/${id}`, data, { timeout: 10000 });
};

export const useCreateBlog = () => {
  return useApiHandler(createBlog);
};
export const useUpdateBlog = () => {
  return useApiHandler(updateBlog);
};

export const useGetBlog = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/blogs/${id}` : null,
    (url) => fetcher(url, { cache: "no-cache" })
  );

  return { data, error, loading: !data && !error, ...rest };
};

export const useGetUserBlogs = () => {
  const { data, error, ...rest } = useSWR(`/api/v1/blogs/me`, (url) =>
    fetcher(url, { cache: "no-cache" })
  );

  return { data, error, loading: !data && !error, ...rest };
};
