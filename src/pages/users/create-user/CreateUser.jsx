import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser, fetchUsers } from "../../../feature/user/userSlice";

const CreateUser = () => {
  const dispatch = useDispatch();

  // Fetch users when component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]); // Include dispatch as a dependency

  // Set up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); // For debugging
    dispatch(addUser(data)); // Dispatch the action to add the user
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
              label="First Name"
              fullWidth
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              fullWidth
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              {...register("password", { required: "Password is required" })}
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
          sx={{ mt: 2 }} // Adds margin at the top of the button
        >
          Create User
        </Button>
      </form>
    </Container>
  );
};

export default CreateUser;
