import axios, { AxiosResponse } from "axios";
import { QiitaPost } from "../models/qiita";
import { useQuery } from "react-query";

const QIITA_URL = "https://qiita.com/api/v2";

const getQiitaPostList = (page: number, per_page: number, query: string) => {
  const url = new URL(`${QIITA_URL}/items`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("per_page", per_page.toString());
  url.searchParams.append("query", query);
  return axios.get<QiitaPost[]>(url.toString()).then((res) => {
    return res.data;
  });
};

const getQiitaItem = (item_id: string) => {
  const url = new URL(`${QIITA_URL}/items/${item_id}`);
  return axios
    .get<QiitaPost>(url.toString())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const useQiitaPostList = (
  page: number,
  per_page: number,
  query: string
) => {
  const { data } = useQuery(
    ["qiitaPostList", page, per_page, query],
    () => {
      return getQiitaPostList(page, per_page, query);
    },
    {
      suspense: true,
    }
  );
  // Suspenseがtrueなのでundefinedにはならないため
  return data as QiitaPost[];
};
