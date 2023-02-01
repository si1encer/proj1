import { Button, Select, Pagination } from "antd";
import { useCallback, useEffect, useState } from "react";
import ProductPreview from "../../components/ProductPreview";
import "./index.css";
const ProductList = ({
  productStorage,
  setPage,
  userCart,
  setUserCart,
  curItem,
  setCurItem,
}) => {
  // add state here
  const [listSize, setListSize] = useState(10);
  const [curProNumber, setCurProNumber] = useState(1);
  //     priceLow/timeLast/priceHigh
  const [sortOption, setSortOption] = useState("priceLow");
  const onResize = useCallback(() => {
    setListSize(document.documentElement.clientWidth > 800 ? 10 : 3);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const sortComparetor = (opt) => {
    switch (opt) {
      case "priceLow": {
        return (a, b) => {
          if (a.price > b.price) return 1;
          else {
            if (a.price < b.price) return -1;
            return 0;
          }
        };
      }

      case "priceHigh": {
        return (a, b) => {
          if (a.price < b.price) return 1;
          else {
            if (a.price > b.price) return -1;
            return 0;
          }
        };
      }
      case "timeLast": {
        return (a, b) => {
          if (a.time && b.time) {
            if (a.time < b.time) return 1;
            else {
              if (a.time > b.time) return -1;
              return 0;
            }
          } else {
            //sort by price from low
            if (a.price > b.price) return 1;
            else {
              if (a.price < b.price) return -1;
              return 0;
            }
          }
        };
      }
      default: {
        return (a, b) => {
          if (a.a > b.a) return 1;
          else {
            if (a.a < b.a) return -1;
            return 0;
          }
        };
      }
    }
  };
  const productCard = (curNumber) => {
    let tempAll = [...productStorage];
    tempAll = tempAll.sort(sortComparetor(sortOption));
    const productRender = tempAll.slice(curNumber, curNumber + listSize);
    let windowRender = productRender.map((item, index) => {
      // let { name,quat srclink, price, id } = item;
      const itemInfo = { ...item };
      return (
        <div
          onClick={() => {
            setCurItem(itemInfo);
          }}
        >
          <ProductPreview
            key={"productPre" + index}
            text={itemInfo}
            curItem={curItem}
            setPage={setPage}
            userCart={userCart}
            setUserCart={setUserCart}
            // setCurItem={setCurItem}
          />
        </div>
      );
    });
    return windowRender;
  };
  return (
    <>
      <div className="ProductPage">
        <div className="ProdsHead">
          <span className="ProductListTitle">Products </span>
          <span className="ProductListOption">
            <Select
              defaultValue={"priceLow"}
              options={[
                { value: "timeLast", label: "Last edited" },
                { value: "priceLow", label: "Price: low to high" },
                { value: "priceHigh", label: "Price: high to low" },
              ]}
              onChange={(e) => {
                setSortOption(e);
              }}
            />
            <Button
              onClick={() => {
                setCurItem({});
                setPage("ModifyItem");
              }}
            >
              ADD Product
            </Button>
          </span>
        </div>
        <div className="ProductsWindow">
          {productCard((curProNumber - 1) * listSize)}
        </div>
        <div className="ProductPagination">
          <Pagination
            defaultCurrent={curProNumber}
            total={productStorage.length}
            pageSize={listSize}
            showSizeChanger={false}
            onChange={(num) => {
              setCurProNumber(num);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default ProductList;
