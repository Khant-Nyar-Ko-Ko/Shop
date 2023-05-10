import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { getData } from "../api";
import Spinner from "../components/spinner/Spinner";
import { useStateContext } from "../context/StateContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const { dispatch } = useStateContext();

  const getProductDetail = async () => {
    setProduct(await getData(`/products/${id}`));
  };

  const getProductByCat = async () => {
    const data = await getData(`/products/category/${product.category}`);
    const filterData = data?.filter((item) => item.id !== product.id);
    setProducts(filterData);
  };

  useEffect(() => {
    getProductDetail();
    getProductByCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, products]);

  return (
    <>
      {product && products.length > 0 ? (
        <div className=" ">
          <div className=" flex gap-5 items-start my-20">
            <img
              src={product?.image}
              className=" h-96  shadow-lg p-10"
              alt=""
            />
            <div className=" flex flex-col gap-5 mt-5">
              <p className=" bg-info text-primary px-2 py-1 text-xs rounded-full w-40 text-center">
                {product?.category}
              </p>
              <h3 className=" text-2xl font-semibold text-header">
                {product?.title}
              </h3>
              <div className="">
                <p className=" text-header font-semibold text-lg">
                  Descriptions
                </p>
                <p className=" text-header tracking-wider leading-6 mt-1">
                  {product?.description}
                </p>
              </div>
              <p className=" flex items-center gap-2">
                <AiFillStar />
                <small className=" text-header font-bold">
                  ({product?.rating?.rate})
                </small>
              </p>
              <p className=" text-header text-xl font-semibold ">
                $ {product?.price}
              </p>
              <div className="">
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: product })
                  }
                  className=" bg-info text-primary px-5 py-2 rounded shadow-lg w-40 transform transition hover:scale-90"
                >
                  Add to Cart
                </button>
                <Link to="/success">
                  <button className=" bg-header ml-3 text-primary px-5 py-2 rounded shadow-lg w-40 transform transition hover:scale-90">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className=" my-20">
            <h1 className=" text-2xl font-semibold text-header">
              You may also like
            </h1>
            <div className="flex flex-wrap gap-7 my-10">
              {products?.map((item) => (
                <div key={item.id}>
                  <img
                    src={item?.image}
                    className="h-52 shadow-lg rounded p-5"
                    alt=""
                  />
                  <p className=" text-header mt-1">${item?.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProductDetail;
