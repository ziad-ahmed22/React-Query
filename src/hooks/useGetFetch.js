import { useQuery } from "react-query";
import { Axios } from "../api/Axios";

export const useGetFetch = (name, path) => {
  return useQuery(name, async () => {
    return await Axios.get(path);
  });
};
