import { useState } from "react";
import { Axios } from "./../api/Axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

const postsFetcher = async (pageNumber) => {
  return await Axios.get(`/posts?_limit=5&_page=${pageNumber}`);
};

export const Pagination = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [activePage, setActivePage] = useState(null);
  const pagesArr = [1, 2, 3, 4, 5];

  const { data: posts, isLoading } = useQuery(
    ["post-page", pageNumber],
    () => postsFetcher(pageNumber)
    // { keepPreviousData: true } // durring fetching next page will keep the prev data
  );

  const prevPage = () => {
    setPageNumber((prev) => prev - 1);
    setActivePage(pageNumber - 1);
  };
  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
    setActivePage(pageNumber + 1);
  };
  const changePageNum = (page) => {
    setPageNumber(page);
    setActivePage(page);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {posts?.data?.map(({ id, title }) => (
            <p key={id}>
              {id} - {title} <Link to={`/posts/${id}`}>Details</Link>
            </p>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "5px" }}>
        <button disabled={pageNumber === 1} onClick={prevPage}>
          Prev
        </button>

        {pagesArr.slice(1, pagesArr.length - 1).map((page) => (
          <button
            key={page}
            onClick={() => changePageNum(page)}
            className={activePage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}

        <button disabled={pageNumber === pagesArr.length} onClick={nextPage}>
          Next
        </button>
      </div>
    </>
  );
};
