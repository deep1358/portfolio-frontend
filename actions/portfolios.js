import axios from "axios";
import { useApiHandler } from ".";
import useSWR from "swr";
import { fetcher } from "./index";

const createPortfolio = (data) => {
  return axios.post("/api/v1/portfolios", data,{timeout:10000});
};
const updatePortfolio = (id, data) => {
  return axios.patch(`/api/v1/portfolios/${id}`, data,{timeout:10000});
};
const deletePortfolio = (id) => {
  return axios.delete(`/api/v1/portfolios/${id}`);
};
export const useCreatePortfolio = () => {
  return useApiHandler(createPortfolio);
};
export const useUpdatePortfolio = () => {
  return useApiHandler(updatePortfolio);
};
export const useDeletePortfolio = () => {
  return useApiHandler(deletePortfolio);
};

export const useGetPortfolio = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/portfolios/${id}` : null,
    (url) => fetcher(url, { cache: "no-cache" })
  );

  return { data, error, loading: !data && !error, ...rest };
};
