import { Axios } from "../api/Axios";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";

const postsFetcher = async ({ pageParam = 1 }) => {
  return await Axios.get(`/posts?_limit=5&_page=${pageParam}`);
};

export const LoadMore = () => {
  const totalPages = 5;
  const queryRes = useInfiniteQuery(["post-page"], postsFetcher, {
    getNextPageParam: (_lastPage, pages) => {
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
  });

  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = queryRes;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        {posts?.pages.map((page) =>
          page?.data.map(({ id, title }) => (
            <p key={id}>
              {id} - {title} <Link to={`/posts/${id}`}>Details</Link>
            </p>
          ))
        )}
      </div>

      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          {isFetchingNextPage ? "Fetching..." : "Load More"}
        </button>
      </div>
    </>
  );
};
