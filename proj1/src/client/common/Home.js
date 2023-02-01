import "./index.css";
import api from "../api/api";
import { useEffect, useState } from "react";
import DefaultError from "../Pages/ErrorPage";
import ModifyProduct from "../Pages/ModifyProduct";
import ProductDetail from "../Pages/ProductDetail";
import ProductList from "../Pages/ProductList";
const Home = ({
  productStorage,
  setProductStorage,
  isLogin,
  userCart,
  setUserCart,
  curItem,
  setCurItem,
}) => {
  //page => Products/Details/ModifyItem/ErrorPage
  const [page, setPage] = useState("Products");

  useEffect(() => {
    const prodsInit = async () => {
      const res = await api.allProductsApi();
      const prods = await res.json();
      setProductStorage([...prods]);
      return prods;
    };
    if (page === "Products") {
      prodsInit();
    }
  }, [page]);
  const homeContent = (flag) => {
    switch (flag) {
      case "Products": {
        return (
          <ProductList
            setPage={setPage}
            productStorage={productStorage}
            userCart={userCart}
            setUserCart={setUserCart}
            curItem={curItem}
            setCurItem={setCurItem}
          />
        );
      }
      case "Details": {
        return (
          <ProductDetail
            curItem={curItem}
            setCurItem={setCurItem}
            productStorage={productStorage}
            setPage={setPage}
            userCart={userCart}
            setUserCart={setUserCart}
          />
        );
      }
      case "ModifyItem": {
        return (
          <ModifyProduct
            setPage={setPage}
            curItem={curItem}
            setCurItem={setCurItem}
          />
        );
      }
      default: {
        return (
          <>
            <DefaultError setPage={setPage} />
          </>
        );
      }
    }
  };

  return <div className="Home">{homeContent(page)}</div>;
};
export default Home;
