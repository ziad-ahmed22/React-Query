import { useQuery } from "react-query";
import { Axios } from "./../api/Axios";
import { Link } from "react-router-dom";

export const Posts = () => {
  const successHandler = (data) => {
    console.log("success", data);
  };
  const errorHandler = (error) => {
    console.log("success", error);
  };

  // ==================================================
  // Query Fetching  // accepts 3 params
  const queryRes = useQuery(
    "posts-query",
    () => {
      return Axios.get("/posts");
    },
    {
      // cacheTime: 2000, // default 5 minutes
      // staleTime: 30000, // default 0 seconds
      // refetchInterval: 2000, // default false

      // fetch on click 1
      // enabled: false, // disable fetching

      onSuccess: successHandler, // fetching success
      onError: errorHandler, // fetching failed
    }
  );

  // Distructure Query Fetching
  const {
    isLoading,
    isError,
    error,
    data: posts,
    status,
    isFetching,

    // fetch on click 2
    // refetch,
  } = queryRes;

  console.log(status, isLoading, isFetching);

  // ===================================================
  // Returning Areas
  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      {/* fetch on click 3 */}
      {/* <button onClick={refetch}>Fetch</button> */}

      {posts?.data?.map(({ id, title }) => (
        <p key={id}>
          {id} - {title} <Link to={`/posts/${id}`}>Details</Link>
        </p>
      ))}
    </div>
  );
};

// ===================================================
// ===================================================
// 1 => loading => success

// status: "loading";     // status: "success"
// isLoading: true;       // isLoading: false

// isSuccess: false;      // isSuccess: true;
// data: undefined;       // data: [{..}, {..}];

// error: null;           // error: null
// isError: false;        // isError: false

// ===================================================
// 1 => loading => error

// status: "loading";     // status: "error"
// isLoading: true;       // isLoading: false

// isSuccess: false;      // isSuccess: false;
// data: undefined;       // data: undefined;

// error: null;           // error: {message: 'msg', ...}
// isError: false;        // isError: true

// ===================================================
// react query cache the data for 5 minutes
// first fetch from server
//      => status: loading, isLoading: true, isFetching: true
//      => status: success, isLoading: false, isFetching: false

// second fetch from cache
//      => status: success, isLoading: false, isFetching: true
//      => status: success, isLoading: false, isFetching: false

// edits on data ?
// third fetch from cache andedits from server
//      => status: success, isLoading: false, isFetching: true
//      => status: success, isLoading: false, isFetching: false

// ===================================================
// every visit to the link it send a request
// you can prevent sending the request as the data not changed
// staleTime: 30000 => durring these 30 seconds will not sent
// the request and isFetching set to false

// first fetch from server
//      => status: loading, isLoading: true, isFetching: true
//      => status: success, isLoading: false, isFetching: false

// second fetch from cache
//      => status: success, isLoading: false, isFetching: false

// edits on data ?
// will not fetch changes
//      => status: success, isLoading: false, isFetching: false

// ===================================================
// refetchInterval: 2000
//  => re fetch data every 2 seconds
//  => stop fetching will the component did mount
