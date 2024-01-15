import { useDispatch, useSelector } from "react-redux";
import { selectOrder, updateStatus } from "../../feature/order/sliceOrder";
import { useParams } from "react-router-dom";
import { getOrderDetailById } from "../../feature/order/sliceOrder";
import Loader from "../../components/Loader/Loader";
import { useEffect, useRef, useState } from "react";
import OrderItem from "../../components/orderItem/OrderItem";
import ProductItem from "../../components/product/ProductItem";
import { Box, Button, Modal, Typography } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "300px",
    height: "50px",
    border: '2px solid rgba(0, 0, 0, 0.2)',
    boxShadow: 24,
    borderRadius: 5
}

const OrderDetail = () => {
    const dispatch = useDispatch();
    const order = useSelector(selectOrder);
    const loading = useSelector((state) => state.order.loading);
    const { id } = useParams();
    const headerCategory = useRef();
    let lastScroll = useRef(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleWindowOnscroll = () => {
        if (lastScroll > window.scrollY) {
            headerCategory.current.style.top = '0px';
        } else if (window.scrollY >= 91) {
            headerCategory.current.style.top = '-91px';
        } else if (window.scrollY === 0) {
            headerCategory.current.style.top = '0';
        }
        lastScroll = window.scrollY;
    };

    const handleOnclickButton = (status) => {
        dispatch(updateStatus({
            id,
            status
        }));
        handleOpen(true);
    }

    useEffect(() => {
        dispatch(getOrderDetailById(id));
    }, [dispatch, order.dataUpdate]);

    useEffect(() => {
        window.addEventListener('scroll', handleWindowOnscroll);
        return () => window.removeEventListener('scroll', handleWindowOnscroll);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="orderdetail__wrapper">
            <div ref={headerCategory} className="orderdetail__updateStatus">
                <h1 className="orderdetail__updateStatus-title">
                    Cập nhật trạng thái cho hóa đơn
                </h1>
                <div className="orderdetail__updateStatus-action">
                    <button onClick={e => handleOnclickButton("Pending")} className="btn__orderdetail btn__pending">Pending</button>
                    <button onClick={e => handleOnclickButton("Success")} className="btn__orderdetail btn__success">Success</button>
                    <button onClick={e => handleOnclickButton("Reject")} className="btn__orderdetail btn__reject">Reject</button>
                </div>
            </div>
            <div className="orderdetail__des">
                <OrderItem data={order.orderDetail} />
            </div>
            <div className="orderdetail__cart">
                <h1 className="orderdetail__cart-title">Danh sách sản phẩm trong giỏ hàng: </h1>
                {order.orderDetail.cartItems?.map((item, index) => (
                    <ProductItem data={item} key={index} />
                ))}
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {order.dataUpdate.status  || "Pending"}
                </Box>
            </Modal>
        </div>
    )
}

export default OrderDetail;