/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const ProductTile = ({ product }) => {
  const COLOURS = {
    beauty: "bg-red-600",
    fragrances: "bg-pink-600",
    furniture: "bg-orange-900",
    groceries: "bg-green-500",
  };

  const badge = product.category;

  const navigate = useNavigate();

  function handleNavigateToDetails(prodId) {
    navigate(`/product-details/${prodId}`);
  }

  return (
    <div
      className="m-1 bg-white px-3 py-4 font-sans rounded-md shadow-md hover:scale-105 cursor-pointer group"
      onClick={() => handleNavigateToDetails(product?.id)}
    >
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold sm:text-xl truncate">
          {product?.title}
        </h1>
        <span
          className={`text-xs font-semibold capitalize ${
            COLOURS[badge] || "bg-slate-600"
          } text-white px-2 py-1 rounded-md h-fit`}
        >
          {product?.category}
        </span>
      </div>

      <div className="mt-4 mb-2">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="h-[250px] mx-auto  group-hover:opacity-75"
        />
      </div>

      <p className="text-[16px] font-medium truncate">{product?.description}</p>

      <div className="mt-4 flex justify-between">
        <div>
          <span className="text-2xl text-blue-500 mr-2 font-semibold ">
            ${product?.price}
          </span>
          <span className="text-lg text-gray-500 font-medium line-through decoration-red-600 decoration-[3px]">
            $
            {(
              (100 * product?.price) /
              (100 - product?.discountPercentage)
            ).toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-xs text-white font-semibold px-2 py-1 rounded-md h-fit bg-orange-500">
            {product?.rating} ⭐️
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
