import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="posts">Posts</NavLink>
      <NavLink to="parallel">Parallel</NavLink>
      <NavLink to="trueparallel">True Parallel</NavLink>
      <NavLink to="dependent">Dependent Queries</NavLink>
      <NavLink to="pagination">Pagination</NavLink>
      <NavLink to="loadmore">Load More</NavLink>
      <NavLink to="employees">Employees</NavLink>
    </div>
  );
};
