const ProductItem = ({data}) => {
    return (
       <div className="productItem__wrapper">
            <img className="productItem__img" src={data.images[0]}>
            </img>
            <div className="productItem__des">
                <h1 className="productItem__des-name">{data.name}</h1>
                <h1 className="productItem__des-quantity">Số lượng: x{data.quantity}</h1>
            </div>
            <span className="productItem__price">{data.subTotal}$</span>
       </div>
    )
}

export default ProductItem;