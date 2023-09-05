import { useForm } from "react-hook-form";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux"; // Removed useSelector for this case
import { addUser } from "../../../feature/user/userSlice"; // Imported addUser from userSlice
import { fetchUsers } from "../../../feature/user/userSlice";
import { useEffect } from "react";

const CreateUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addUser(data));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              fullWidth
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="LastName"
              fullWidth
              {...register("lastname", { required: "lastname is required" })}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              {...register("email", { required: "email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              {...register("password", { required: "password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Create User
        </Button>
      </form>
    </Container>
  );
};

export default CreateUser; // Export the CreateUser component
