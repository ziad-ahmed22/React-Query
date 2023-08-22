import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./pages/Home";
import { MainRoot } from "./roots/MainRoot";
import { Posts } from "./pages/Posts";
import { Error } from "./pages/Error";
import { PostDetails } from "./pages/PostDetails";
import { Parallel } from "./pages/Parallel";
import { TrueParallel } from "./pages/TrueParallel";
import { Dependent } from "./pages/Dependent";
import { Pagination } from "./pages/Pagination";
import { LoadMore } from "./pages/LoadMore";
import { Employees } from "./pages/Employees";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/:postId", element: <PostDetails /> },
      { path: "parallel", element: <Parallel /> },
      { path: "trueparallel", element: <TrueParallel /> },
      { path: "dependent", element: <Dependent email="asd@asd.asd" /> },
      { path: "pagination", element: <Pagination /> },
      { path: "loadmore", element: <LoadMore /> },
      { path: "employees", element: <Employees /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
