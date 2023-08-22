import { useParams } from "react-router-dom";
import { usePostDetails } from "../hooks/usePostDetails";

export const PostDetails = () => {
  const { postId } = useParams();
  const { data, isLoading, isError, error } = usePostDetails(postId);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <h3>Post Details {`"${data?.data.id}"`}</h3>
      <p>ID: {data?.data.id}</p>
      <p>Title: {data?.data.title}</p>
    </div>
  );
};
