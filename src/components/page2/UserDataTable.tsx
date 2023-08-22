import DepartmentList from "./DepartmentList";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserDataTable: React.FC = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "User ID", flex: 0.5, minWidth: 50 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
    { field: "username", headerName: "Username", flex: 1, minWidth: 100 },
    { field: "email", headerName: "E-mail", flex: 1, minWidth: 100 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 100 },
    { field: "website", headerName: "Website", flex: 1, minWidth: 100 },
    {
      field: "address",
      headerName: "address",
      flex: 2,
      minWidth: 150,
      renderCell: (params: any) =>
        params.row.address.street +
        " " +
        params.row.address.suite +
        " " +
        params.row.address.city +
        " " +
        params.row.address.zipcode,
    },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));

    if (!localStorage.getItem("loginData")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <DataGrid rows={users} columns={columns} />
      </Box>
      <DepartmentList />
    </>
  );
};

export default UserDataTable;
