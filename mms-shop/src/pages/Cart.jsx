import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useStateContext } from "../context/StateContext";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useStateContext();

  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const checkOutHandler = () => {
    dispatch({ type: "CART_EMPTY" });
    navigate("/success");
  };

  const increasePrice = (price) => {
    setTotal(total + price);
  };

  const decreasePrice = (price) => {
    setTotal(total - price);
  };

  useEffect(() => {
    setTotal(cart.reduce((initial, current) => initial + current.price, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cart.length > 0 ? (
        <div className=" grid grid-cols-4">
          <div className=" col-span-3 flex flex-col gap-5">
            {cart?.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                decreasePrice={decreasePrice}
                increasePrice={increasePrice}
              />
            ))}
          </div>
          <div className=" col-span-1">
            <div className=" bg-secondary p-10 rounded shadow-lg">
              <h1 className=" text-3xl text-info font-semibold">
                Total Price - ${total.toFixed(2)}
              </h1>

              <button
                onClick={checkOutHandler}
                className=" px-5 py-2 bg-info text-primary rounded shadow-lg uppercase my-5"
              >
                Checkout
              </button>
            </div>
            <button
              className=" px-5 py-2 bg-danger text-primary rounded shadow-lg uppercase my-5"
              onClick={() => dispatch({ type: "CART_EMPTY" })}
            >
              Cart Empty
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex justify-center">
          <div className=" bg-secondary shadow-lg rounded p-20 mt-20 animate__animated animate__backInDown">
            <h1 className="font-semibold text-4xl tracking-wider my-5 text-info">
              Your Card Is Empty
            </h1>
            <button
              onClick={() => navigate("/")}
              className=" text-primary bg-danger px-5 py-2 shadow-lg uppercase rounded transition hover:scale-105"
            >
              Go shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
