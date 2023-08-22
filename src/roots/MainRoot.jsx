import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";

export const MainRoot = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
