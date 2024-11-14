/* eslint-disable react/prop-types */

import { useContext } from "react";
import { ShoppingContext } from "../Context/shopping-context";

const CartItemTile = ({ cartItem }) => {
  const { handleAddToCart, handleDeleteFromCart } = useContext(ShoppingContext);
  return (
    <div className="flex group flex-col sm:flex-row gap-4 rounded-lg border-2 border-gray-500 my-3 px-4 py-3 bg-slate-200 w-full">
      <div>
        <img
          src={cartItem?.thumbnail}
          alt={cartItem?.title}
          className="w-[150px] bg-white/50 group-hover:bg-white/80 rounded-sm"
        />
      </div>
      <div className="ml-4 w-full flex flex-col justify-between">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h2 className="text-2xl text-gray-800 font-bold tracking-wide">
              {cartItem?.title}
            </h2>
            <h3 className="text-sm leading-6 font-medium text-gray-500 tracking-wide">
              {cartItem.returnPolicy === "No return policy" ? (
                <span>❌</span>
              ) : (
                <span>✅</span>
              )}
              &nbsp;
              {cartItem.returnPolicy}
            </h3>
          </div>

          <div>
            <button
              onClick={() => handleDeleteFromCart(cartItem, true)}
              className="text-gray-800 font-semibold hover:text-white hover:bg-gray-800 px-2 py-1 border-2 border-black"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col justify-between w-1/3 gap-2 min-[1160px]:flex-row">
            <span className="text-lg font-bold text-gray-700">
              Quantity: {cartItem?.quantity}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => handleAddToCart(cartItem)}
                className="flex items-center justify-center font-medium border-2 text-gray-800 hover:text-white hover:bg-gray-800 border-black text-lg p-1 rounded-sm h-7 w-7"
              >
                +
              </button>
              <button
                onClick={() => handleDeleteFromCart(cartItem, false)}
                className="flex items-center justify-center font-medium border-2 text-gray-800 hover:text-white hover:bg-gray-800 border-black text-lg p-1 rounded-sm h-7 w-7"
              >
                -
              </button>
            </div>
          </div>

          <div>
            <span className="text-lg font-bold text-green-700">
              ${cartItem?.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemTile;
