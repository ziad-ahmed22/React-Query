import { useQueries } from "react-query";
import { Axios } from "../api/Axios";

export const TrueParallel = () => {
  const ids = [1, 2];
  const [post1, post2] = useQueries(
    ids.map((id) => {
      return {
        queryKey: ["posts", id],
        queryFn: () => Axios.get(`/posts/${id}`),
      };
    })
  );

  // const resArr = useQueries([
  //   {queryKey: "",queryFn:""},
  //   {queryKey: "",queryFn:""},
  // ])

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 20px" }}>
        <h3>Post</h3>
        {post1.isLoading && <p>Loading...</p>}

        {post1.isError && <p>{post1.error.message}</p>}

        <p>
          {post1?.data?.data?.id} - {post1?.data?.data?.title}
        </p>
      </div>

      <div style={{ margin: "0 20px" }}>
        <h3>Post</h3>
        {post2.isLoading && <p>Loading...</p>}

        {post2.isError && <p>{post2.error.message}</p>}

        <p>
          {post2?.data?.data?.id} - {post2?.data?.data?.title}
        </p>
      </div>
    </div>
  );
};
