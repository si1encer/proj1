import "./index.css";
import ItemAdder from "../../components/ItemAdder";
import { Button } from "antd";
const ProductDetail = ({
  curItem,
  setCurItem,
  productStorage = [],
  setPage,
  userCart,
  setUserCart,
}) => {
  const selectedProduct = { ...curItem };
  return (
    <>
      <div className="detailHead">Product Detail</div>
      <div className="detailPage">
        <img src={selectedProduct.srclink}></img>
        <div className="proTextPart">
          <div className="proHead">
            <Button
              onClick={() => {
                setCurItem({});
                setPage("Products");
              }}
            >
              Back to Home
            </Button>
          </div>
          <div className="proCategory">{selectedProduct.category} </div>
          <div className="productName">{selectedProduct.name} </div>

          <div className="prodPrice">
            <span>${selectedProduct.price.toFixed(2)}</span>
            {selectedProduct.quantity > 0 ? (
              <span
                className="prodNumIcon"
                style={{ backgroundColor: "Green" }}
              >
                in stock
              </span>
            ) : (
              <span className="prodNumIcon">out of stock</span>
            )}
          </div>
          <div className="productDescription">
            {selectedProduct.description}{" "}
          </div>
          <div className="detailOperation">
            <ItemAdder
              prodInfo={selectedProduct}
              userCart={userCart}
              setUserCart={setUserCart}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
