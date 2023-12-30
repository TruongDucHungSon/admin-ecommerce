import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { revenueStatistics, selectStatistical, soldProductsStatistics, soldProductsStatisticsById } from "../../feature/statistical/sliceStatistical";
import Loader from "../../components/Loader/Loader";

function Statistical () {
    const dispatch = useDispatch();
    const statistical = useSelector(selectStatistical);
    const loading = useSelector((state) => state.statistical.loading);
  
    useEffect(() => {
      dispatch(revenueStatistics());
      dispatch(soldProductsStatistics());
      dispatch(soldProductsStatisticsById());
    }, [dispatch]);

    const columns = [
        { field: "name", headerName: "Name", flex: 2},
        { field: "description", headerName: "Description", flex: 2 },
        { field: "price", headerName: "Price", flex: 1 },
        { field: "newPrice", headerName: "New Price", flex: 1 },
        { field: "category", headerName: "Category", flex: 2 },
        {
          field: "images",
          headerName: "Image",
          flex: 2,
          renderCell: (params) => (
            <div style={{ display: "flex" }}>
              {params.value?.map((image, index) => (
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
        { field: "sold", headerName: "Sold", flex: 1 },
    ];
  }

export default Statistical;
