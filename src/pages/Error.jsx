import { useRouteError } from "react-router-dom";
import { Nav } from "./../components/Nav";

export const Error = () => {
  const error = useRouteError();

  return (
    <>
      <Nav />
      <p>{error.message || error.data}</p>
    </>
  );
};
