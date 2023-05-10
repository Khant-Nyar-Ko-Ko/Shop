/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  AiFillDelete,
  AiFillPlusSquare,
  AiFillMinusSquare,
} from "react-icons/ai";
import { useStateContext } from "../context/StateContext";

const CartItem = ({ item, increasePrice, decreasePrice }) => {
  const { dispatch } = useStateContext();
  const [qty, setQty] = useState(1);
  const increaseQty = () => {
    setQty((prev) => prev + 1);
    increasePrice(item.price);
  };
  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
      decreasePrice(item.price);
    }
  };

  const removeItemHandler = () => {
    decreasePrice(item.price * qty);
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };
  return (
    <div className="flex items-start gap-4">
      <img src={item?.image} className=" h-32 shadow-md rounded p-4" alt="" />
      <div className="">
        <h3 className=" text-2xl font-semibold">{item?.title}</h3>
        <p className=" text-secondary text-3xl my-3">${item?.price * qty}</p>
        <div className=" flex items-center gap-3">
          <AiFillMinusSquare
            onClick={decreaseQty}
            className=" text-3xl text-danger cursor-pointer"
          />
          <p className="text-2xl">{qty}</p>
          <AiFillPlusSquare
            onClick={increaseQty}
            className=" text-3xl text-info cursor-pointer"
          />
          <AiFillDelete
            onClick={removeItemHandler}
            className=" text-danger text-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
