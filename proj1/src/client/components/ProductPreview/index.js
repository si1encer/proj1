import "./index.css";
import ItemAdder from "../ItemAdder";
// import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const ProductPreview = ({ curItem, text, setPage, userCart, setUserCart }) => {
  return (
    <div className="productPreview">
      <div
        className="productPreinfo"
        onClick={() => {
          // setCurItem({ id: text.id });
          setPage("Details");
        }}
      >
        <img src={text.srclink} className="prodPreImg" />
        <div className="prodPreName">{text.name}</div>
        <div className="prodPrePrice">$ {text.price}</div>
      </div>
      <ItemAdder
        prodInfo={text}
        userCart={userCart}
        setUserCart={setUserCart}
        setPage={setPage}
      />
    </div>
  );
};
export default ProductPreview;
