import axios, { AxiosError } from "axios";
import { QiitaPost } from "../models/qiita";
import { useQuery } from "react-query";

const QIITA_URL = "https://qiita.com/api/v2";

const getQiitaPostList = async (
  page?: string,
  per_page?: string,
  query?: string
) => {
  const url = new URL(`${QIITA_URL}/items`);
  if (page) url.searchParams.append("page", page);
  if (per_page) url.searchParams.append("per_page", per_page);
  if (query) url.searchParams.append("query", query);
  return axios.get<QiitaPost[]>(url.toString()).then((res) => {
    return res.data;
  });
};

const getQiitaPost = async (item_id: string) => {
  const url = new URL(`${QIITA_URL}/items/${item_id}`);
  return axios.get<QiitaPost>(url.toString()).then((res) => {
    return res.data;
  });
};

export const useQiitaPost = (item_id: string | undefined) => {
  if (item_id === undefined) throw new Error("item_id is undefined");
  const { data } = useQuery(
    ["qiitaPost", item_id],
    () => {
      return getQiitaPost(item_id);
    },
    {
      suspense: true,
      retry: (failureCount, error: AxiosError) => {
        console.log(failureCount, error);
        return false;
      },
    }
  );
  // Suspenseがtrueなのでundefinedにはならないため
  return data as QiitaPost;
};

export const useQiitaPostList = (
  page?: string,
  per_page?: string,
  query?: string
) => {
  const { data } = useQuery(
    ["qiitaPostList", page, per_page, query],
    () => {
      return getQiitaPostList(page, per_page, query);
    },
    {
      suspense: true,
      retry: (failureCount, error: AxiosError) => {
        console.log(failureCount, error);
        if (error.response?.status && error.response?.status >= 500) {
          return failureCount < 3;
        } else if (error.response?.status && error.response?.status >= 400) {
          return false;
        }
        return false;
      },
    }
  );
  // Suspenseがtrueなのでundefinedにはならないため
  return data as QiitaPost[];
};
