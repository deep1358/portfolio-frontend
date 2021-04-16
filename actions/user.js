import useSWR from "swr";
import { fetcher } from "./index";

export const useGetUser = () => {
  const { data, error, ...rest } = useSWR("/api/v1/me", (url) => fetcher(url, {cache:"no-cache"}));

  return { data, error, loading: !data && !error, ...rest };
};
