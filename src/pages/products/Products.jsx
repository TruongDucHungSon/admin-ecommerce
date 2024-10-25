import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteproduct,
  fetchproducts,
  selectproducts,
} from "../../feature/product/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectproducts);
  const loading = useSelector((state) => state.product.loading);

  // Using local component state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const loadProducts = async () => {
      const response = await dispatch(
        fetchproducts({ page: currentPage, limit: rowsPerPage })
      );
      if (response?.payload?.totalPages) {
        setTotalPages(response.payload.totalPages);
      }
    };
    loadProducts();
  }, [dispatch, currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteproduct(id));
    }
    dispatch(fetchproducts({ page: currentPage, limit: rowsPerPage }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
              to={`/product/${params.id}`}
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
      ? products.map((product) => ({
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
    <div style={{ marginTop: "80px", height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={rowsPerPage}
        page={currentPage - 1}
        rowCount={totalPages * rowsPerPage}
        pagination
        paginationMode="server"
        onPageChange={(params) => handlePageChange(params.page + 1)}
        checkboxSelection
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        Total products:
        <span style={{ marginLeft: "5px" }}>{products.length}</span>
      </div>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
