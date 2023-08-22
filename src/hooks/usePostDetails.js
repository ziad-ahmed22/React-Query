import { useQuery } from "react-query";
import { Axios } from "../api/Axios";

const getPost = async ({ queryKey }) => {
  //   console.log(queryKey); // ["post-details", postId]
  return await Axios.get(`/posts/${queryKey[1]}`);
};

export const usePostDetails = (postId) => {
  return useQuery(["post-details", postId], getPost);
};

// =======================================

// import { useQuery } from "react-query";
// import { Axios } from "../api/Axios";

// const getPost =  async(id) => {
//   return await Axios.get(`/posts/${id}`);
// };

// export const usePostDetails = (postId) => {
//   return useQuery(["post-details", postId], () => getPost(postId));
// };
