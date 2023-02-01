import CategoryInput from "../../components/CategoryInput";
import api from "../../api/api";
import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import "./index.css";
const ModifyProduct = ({ curItem, setCurItem, setPage }) => {
  //
  const [productInfo, setProductInfo] = useState({ ...curItem });
  const [picPreview, setPicPreview] = useState("");
  const [formError, setFormError] = useState({
    nameError: false,
    nameMes: "",
    descError: false,
    descMes: "",
    cateError: false,
    cateMes: "",
    numError: false,
    numMes: "",
    srcError: false,
    srcMes: "",
    priceError: false,
    priceMes: "",
  });
  useEffect(() => {
    if (curItem.id) {
      setProductInfo((prev) => ({ ...prev, id: curItem.id }));
    } else {
      setProductInfo({ category: "category1" });
    }
  }, []);
  const { TextArea } = Input;
  function isValidUrl(str) {
    const pattern = new RegExp(
      "^([a-zA-Z]+:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(str);
  }
  const validCont = (cont, opt) => {
    switch (opt) {
      case "text": {
        if (cont) {
          return true;
        } else {
          return false;
        }
      }
      case "number": {
        if (cont == NaN || cont < 0) {
          return false;
        }
        return true;
      }
      case "link": {
        try {
          return isValidUrl(cont);
        } catch (err) {
          return false;
        }
      }
    }
  };
  const handleSubmit = async () => {
    if (!validCont(productInfo.name, "text")) {
      setFormError((prev) => ({
        ...prev,
        nameError: true,
        nameMes: "error!",
      }));
      return;
    }
    if (!validCont(productInfo.description, "text")) {
      setFormError((prev) => ({
        ...prev,
        descError: true,
        descMes: "error!",
      }));
      return;
    }
    if (
      (productInfo.quantity >= 0 &&
        validCont(productInfo.quantity, "number")) ||
      (productInfo.id == undefined && productInfo.quantity > 0)
    ) {
      // console.log("a");
    } else {
      setFormError((prev) => ({
        ...prev,
        numError: true,
        numMes: "error!",
      }));
      return;
    }
    if (
      productInfo.price &&
      validCont(productInfo.price, "number") &&
      productInfo.price > 0
    ) {
      // console.log("a");
    } else {
      setFormError((prev) => ({
        ...prev,
        priceError: true,
        priceMes: "error!",
      }));
      return;
    }
    if (!validCont(productInfo.srclink, "link")) {
      setFormError((prev) => ({
        ...prev,
        srcError: true,
        srcMes: "error!",
      }));
      return;
    }
    if (curItem.id) {
      // console.log("edit prod");
      // console.log(productInfo);
      try {
        const res = await api.editProductApi(productInfo);
        if (res.status === 200) {
          alert("edit product succeed");
          setPage("Products");
        } else {
          const mes = await res.json();
          alert(mes.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("add prod");
      console.log(productInfo);
      try {
        const res = await api.addProductApi(productInfo);
        if (res.status === 200) {
          alert("add product succeed");
          setPage("Products");
        } else if (res.status === 409) {
          const mes = await res.json();
          setFormError((prev) => ({
            ...prev,
            nameError: true,
            nameMes: mes.message,
          }));
        } else {
          const mes = await res.json();
          alert(mes.message);
        }
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <>
      <div className="modProdHead">
        <div className="modHeadText">
          {curItem.id ? "Edit" : "Create"} Product{" "}
        </div>{" "}
        <Button
          onClick={() => {
            setPage("Products");
          }}
        >
          Back to Home
        </Button>
      </div>
      <div className="modifyProdForm">
        <div className="ProdName">
          <div>Product Name</div>
          <input
            className="prodInput"
            type={"text"}
            defaultValue={curItem.name}
            onBlur={(e) => {
              if (validCont(e.target.value, "text")) {
                setFormError((prev) => ({
                  ...prev,
                  nameError: false,
                  nameMes: "",
                }));
                setProductInfo((prev) => ({ ...prev, name: e.target.value }));
              } else {
                setFormError((prev) => ({
                  ...prev,
                  nameError: true,
                  nameMes: "name cant be empty!",
                }));
              }
            }}
          ></input>
          {formError.nameError ? (
            <div style={{ color: "red", textAlign: "right" }}>
              {formError.nameMes}
            </div>
          ) : null}
        </div>
        <div className="ProdDesc">
          <div>Product description</div>
          <TextArea
            className="prodInput"
            rows={3}
            defaultValue={curItem.description}
            // placeholder="write the description here..."
            onBlur={(e) => {
              if (validCont(e.target.value, "text")) {
                setFormError((prev) => ({
                  ...prev,
                  descError: false,
                  descMes: "",
                }));
                setProductInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              } else {
                setFormError((prev) => ({
                  ...prev,
                  descError: true,
                  descMes: "Content cant be empty!",
                }));
              }
            }}
          />
          {formError.descError ? (
            <div style={{ color: "red", textAlign: "right" }}>
              {formError.descMes}
            </div>
          ) : null}
        </div>
        <div className="ProdCate">
          <div>Category</div>
          <Select
            className="prodInput"
            defaultValue={curItem.category ? curItem.category : "category1"}
            onChange={(value) => {
              setProductInfo((prev) => ({
                ...prev,
                category: value,
              }));
            }}
            options={[
              { value: "category1", label: "category1" },
              { value: "category2", label: "category2" },
              { value: "category3", label: "category3" },
            ]}
          />
        </div>
        <div className="ProdPrice">
          <div>Price</div>
          <input
            type={"number"}
            className="prodInput"
            defaultValue={curItem.price}
            onBlur={(e) => {
              let num1 = parseFloat(e.target.value);
              num1 = validCont(num1, "number") ? num1.toFixed(2) : num1;
              if (validCont(num1, "number") && num1 > 0) {
                if (num1 > 9999.99) {
                  setFormError((prev) => ({
                    ...prev,
                    priceError: true,
                    priceMes: "number must less then 9999.99!",
                  }));
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    priceError: false,
                    priceMes: "",
                  }));
                  setProductInfo((prev) => ({
                    ...prev,
                    price: num1,
                  }));
                }
              } else {
                setFormError((prev) => ({
                  ...prev,
                  priceError: true,
                  priceMes: "should be a postive number!",
                }));
              }
              e.target.value = num1;
            }}
          ></input>
          {formError.priceError ? (
            <div style={{ color: "red", textAlign: "right" }}>
              {formError.priceMes}
            </div>
          ) : null}
        </div>
        <div className="ProdNum">
          <div>In stock quantity</div>
          <input
            className="prodInput"
            type={"number"}
            defaultValue={curItem.quantity}
            onBlur={(e) => {
              try {
                let num1 = parseInt(e.target.value);
                if (validCont(num1, "number")) {
                  if ((num1 < 9999 && num1 > 0) || (num1 == 0 && curItem.id)) {
                    setFormError((prev) => ({
                      ...prev,
                      numError: false,
                      numMes: "",
                    }));
                    setProductInfo((prev) => ({
                      ...prev,
                      quantity: num1,
                    }));
                  } else {
                    setFormError((prev) => ({
                      ...prev,
                      numError: true,
                      numMes: "choose # in (0,9999)",
                    }));
                  }
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    numError: true,
                    numMes: "should be a postive integer!",
                  }));
                }
                e.target.value = num1;
              } catch (e) {
                setFormError((prev) => ({
                  ...prev,
                  numError: true,
                  numMes: "should be a postive integer!",
                }));
              }
            }}
          ></input>
          {formError.numError ? (
            <div style={{ color: "red", textAlign: "right" }}>
              {formError.numMes}
            </div>
          ) : null}
        </div>

        <div className="ProdSrcl">
          <div>Add Image Link</div>
          <div className="ProdSrcFooter">
            <input
              className="prodInput"
              placeholder="http://"
              defaultValue={
                curItem.srclink ? curItem.srclink : productInfo.srclink
              }
              onBlur={(e) => {
                if (validCont(e.target.value, "link")) {
                  setFormError((prev) => ({
                    ...prev,
                    srcError: false,
                    srcMes: "",
                  }));
                  setPicPreview(e.target.value);
                } else {
                  setFormError((prev) => ({
                    ...prev,
                    srcError: true,
                    srcMes: "link invalid!",
                  }));
                }
              }}
            />
            <button
              id="prodInputBut"
              onClick={() => {
                setProductInfo((prev) => ({ ...prev, srclink: picPreview }));
              }}
            >
              upload
            </button>
          </div>
          {formError.srcError ? (
            <div style={{ color: "red", textAlign: "right" }}>
              {formError.srcMes}
            </div>
          ) : null}
        </div>
        <div className="ProdPicv">
          {curItem.srclink ? (
            <img id="pic1" src={curItem.srclink}></img>
          ) : productInfo.srclink ? (
            <img id="pic1" src={productInfo.srclink}></img>
          ) : (
            <div id="pic1">image preview</div>
          )}
        </div>
      </div>
      <Button
        type="primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        {curItem.id ? "Edit Product" : "Add Product"}
      </Button>
    </>
  );
};
export default ModifyProduct;
