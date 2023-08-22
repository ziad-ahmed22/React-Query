import { useRef } from "react";
import { Axios } from "../api/Axios";
import { useMutation, useQueryClient } from "react-query";
import { EmployssBox } from "./EmployssBox";

const addEmployeeFetcher = async (emp) => {
  return await Axios.post("/employees", emp);
};

export const Employees = () => {
  const queryClient = useQueryClient();
  const name = useRef(null);
  const age = useRef(null);

  const {
    mutate: addEmployee,
    isLoading,
    isError,
    error,
  } = useMutation(addEmployeeFetcher, {
    // // making a get request to get data after adding
    // onSuccess: () => {
    //   queryClient.invalidateQueries("employees"); // the key of employees query
    // },

    // we just get data from a chache without making a get request
    onSuccess: (data) => {
      queryClient.setQueryData("employees", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [data.data, ...oldQueryData.data],
        };
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: name.current.value, age: age.current.value };
    if (data.name !== "" && data.age !== "") {
      addEmployee(data);
    }
    name.current.value = age.current.value = null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={name} required placeholder="Name" />
        <input type="text" ref={age} required placeholder="Age" />
        <button type="submit">
          {isLoading ? "Loading..." : "Add Employee"}
        </button>
      </form>

      {isError && <p style={{ color: "#f99" }}>{error.message}</p>}

      <EmployssBox />
    </div>
  );
};
