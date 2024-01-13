import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteproduct,
  selectproducts,
  fetchproducts,
} from "../../feature/product/productSlice";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Loader from "../../components/Loader/Loader";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectproducts);

  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    dispatch(fetchproducts());
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteproduct(id));
      dispatch(fetchproducts());
    }
  };

  if (loading) {
        return <Loader />;
    }

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "newPrice", headerName: "New Price", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "images",
      headerName: "Image",
      flex: 2,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          {params.value.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />
          ))}
        </div>
      ),
    },
    { field: "stock", headerName: "Stock", flex: 1 },
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
              to={`/product/update/${params.id}`}
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

  const rows =
    products && Array.isArray(products)
      ? products?.map((product) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          newPrice: product.newprice,
          category: product.category,
          images: product.images,
          stock: product.stock,
        }))
      : [];

  return (
    <div style={{ marginTop: "80px  ", height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default Product;
