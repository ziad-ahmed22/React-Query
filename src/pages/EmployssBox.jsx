import { Axios } from "../api/Axios";
import { useQuery } from "react-query";

const getEmployees = async () => {
  return await Axios.get("/employees");
};

export const EmployssBox = () => {
  const {
    data: employees,
    isLoading,
    isError,
    error,
  } = useQuery(["employees"], getEmployees);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <table border={15}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {!employees?.data.length ? (
          <tr>
            <td colSpan={3}>No Employes!</td>
          </tr>
        ) : (
          <>
            {employees?.data.map(({ id, name, age }, idx) => (
              <tr key={id}>
                <td>{idx + 1}</td>
                <td>{name}</td>
                <td>{age}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};
