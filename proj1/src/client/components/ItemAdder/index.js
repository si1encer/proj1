import "./index.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { userSchema } from "../../../server/database/schema";
const ItemAdder = ({ prodInfo, setPage, userCart = [], setUserCart }) => {
  const addButtonContent = () => {
    const selectedItem1 = userCart.find(({ id }) => {
      return id === prodInfo.id;
    });
    const selectedItem = selectedItem1 ? selectedItem1.purNum : 0;
    if (selectedItem > 0) {
      return (
        <span className="numberChanger">
          <button
            className="numberButton"
            onClick={() => {
              let tempItem = [...userCart];
              tempItem.map((e) => {
                if (e.id === prodInfo.id) {
                  // console.log(prodInfo);
                  e.purNum = e.purNum <= 1 ? 0 : e.purNum - 1;
                }
              });
              setUserCart(tempItem);
            }}
          >
            <MinusOutlined />
          </button>

          <input inputMode={"numeric"} value={selectedItem} />
          <button
            className="numberButton"
            onClick={() => {
              let tempItem = [...userCart];
              tempItem.map((e) => {
                if (e.id === prodInfo.id) {
                  e.purNum += 1;
                  e.purNum =
                    e.purNum > prodInfo.quantity ? prodInfo.quantity : e.purNum;
                }
              });
              setUserCart(tempItem);
            }}
          >
            <PlusOutlined />
          </button>
        </span>
      );
    } else {
      return (
        <span className="numberChanger2">
          <button
            className="ncDefBut"
            onClick={() => {
              let tempItem = [...userCart];
              if (selectedItem1) {
                let tempItem = [...userCart];
                tempItem.map((e) => {
                  if (e.id === prodInfo.id) {
                    e.purNum =
                      e.purNum + 1 > prodInfo.quantity
                        ? prodInfo.quantity
                        : e.purNum + 1;
                  }
                });
                setUserCart(tempItem);
              } else if (prodInfo.quantity < 1) {
                alert("this product out of stock!");
              } else {
                tempItem.push({ id: prodInfo.id, purNum: 1 });
                setUserCart(tempItem);
              }
            }}
          >
            Add
          </button>
        </span>
      );
    }
  };
  //
  return (
    <div className="itemAdder">
      <span className="itemAdderP1">{addButtonContent()}</span>
      <span className="itemAdderP2">
        <button
          onClick={() => {
            setPage("ModifyItem");
          }}
        >
          Edit
        </button>
      </span>
    </div>
  );
};
export default ItemAdder;
