import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  selectUsers,
  fetchUsers,
} from "../../feature/user/userSlice";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Loader from "../../components/Loader/Loader";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteUser(id));
    }
  };

  if (loading) {
        return <Loader />;
    }

  const columns = [
    { field: "username", headerName: "Name", flex: 1 },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(params.id)}
              sx={{
                padding: "6px",
                minWidth: "0",
              }}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to={`/user/update/${params.id}`}
              variant="outlined"
              color="primary"
              sx={{
                padding: "6px",
                minWidth: "0",
              }}
            >
              <EditIcon fontSize="small" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    username: user.username,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  }));

  return (
    <div style={{ marginTop: "80px  ", height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default User;
