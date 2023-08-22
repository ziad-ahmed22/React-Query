// twice useQuery 1
// import { useQuery } from "react-query";
// import { Axios } from "../api/Axios";

// useQueries 1
import { useQueries } from "react-query";
import { Axios } from "../api/Axios";

// custom hook 1
// import { useGetFetch } from "../hooks/useGetFetch";

// twice useQuery 2
// const postsFetcher = async() => {
//   return await Axios.get("/posts");
// };
// const albumsFetcher = async() => {
//   return await Axios.get("/albums");
// };

export const Parallel = () => {
  // twice useQuery 3
  //   const posts = useQuery("posts", postsFetcher);
  //   const albums = useQuery("albums", albumsFetcher);

  // useQueries 2
  const [posts, albums] = useQueries([
    { queryKey: ["posts"], queryFn: () => Axios.get("/posts") },
    { queryKey: ["albums"], queryFn: () => Axios.get("/albums") },
  ]);

  // custom hook 2
  // const posts = useGetFetch("posts", "/posts");
  // const albums = useGetFetch("albums", "/albums");

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 20px" }}>
        <h3>Posts</h3>
        {posts.isLoading && <p>Loading...</p>}

        {posts.isError && <p>{posts.error.message}</p>}

        {posts?.data?.data?.map(({ id, title }) => (
          <p key={id}>
            {id} - {title}
          </p>
        ))}
      </div>

      <div style={{ margin: "0 20px" }}>
        <h3>Albums</h3>
        {albums.isLoading && <p>Loading...</p>}

        {albums.isError && <p>{albums.error.message}</p>}

        {albums?.data?.data?.map(({ id, title }) => (
          <p key={id}>
            {id} - {title}
          </p>
        ))}
      </div>
    </div>
  );
};
