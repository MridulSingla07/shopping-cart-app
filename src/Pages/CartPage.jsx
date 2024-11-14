import { useContext } from "react";
import { ShoppingContext } from "../Context/shopping-context";
import CartItemTile from "../Components/CartItemTile";
import { Link, useNavigate } from "react-router-dom";
import NavButtons from "../Components/NavButtons";

const CartPage = () => {
  const { cartItems } = useContext(ShoppingContext);

  console.log(cartItems);

  const totalBill = cartItems.reduce((accumulatedVal, currentValue) => {
    return accumulatedVal + currentValue.totalPrice;
  }, 0);
  const deliveryAmt = totalBill > 100 ? 0 : totalBill * 0.1;
  const grandTotal = totalBill + deliveryAmt;

  const navigate = useNavigate();

  if (!cartItems || cartItems?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold font-sans my-10 text-gray-800 text-center underline decoration-blue-800 decoration-8 underline-offset-[10px]	">
          Shopping Cart
        </h1>
        <h1 className="text-4xl font-bold font-sans text-red-600 text-center leading-[50px]">
          No Item in the Cart !
          <br /> Please Add Some Items.
        </h1>

        <Link
          to="/products"
          className="mt-10 text-lg text-gray-800 font-semibold hover:text-white hover:bg-gray-800 bg-transparent px-2 py-1 border-2 border-black"
        >
          Go To Products Page
        </Link>
      </div>
    );
  }
  return (
    <>
      <section className="w-screen bg-slate-100 px-8 py-10 min-h-screen">
        <div className="relative">
          <h1 className="text-5xl font-bold font-sans text-gray-800 text-center underline decoration-blue-800 decoration-8 underline-offset-[10px]">
            Shopping Cart
          </h1>
          <NavButtons />
        </div>

        <div className="flex px-10 py-4 gap-5 mt-16 min-h-[550px]">
          {/* left section : cart items */}
          <div className="w-3/5">
            {cartItems && cartItems.length > 0
              ? cartItems.map((cartItem) => (
                  <CartItemTile cartItem={cartItem} key={cartItem.id} />
                ))
              : null}
          </div>

          {/* right section : checkout billing */}
          <div className="w-2/5 max-h-[500px] my-3 px-8 pt-3 rounded-lg">
            <h2 className="text-xl text-gray-800 font-bold tracking-wide ">
              Order Summary
            </h2>
            <div className="h-[3px] my-1 bg-gray-500 rounded-lg"></div>
            <div className="text-lg font-semibold mt-6 text-gray-800">
              <div>
                <span>Total : ${totalBill.toFixed(2)}</span>
              </div>
              <div>
                <span>Delivery Charge : ${deliveryAmt.toFixed(2)}</span>
              </div>
              <div>
                <span>
                  <h3
                    className={`font-light mt-2 text-red-500 ${
                      totalBill < 100 ? "visible" : "invisible"
                    }`}
                  >
                    Free delivery on orders above $100
                  </h3>
                </span>
              </div>
              <div className="mt-12 text-green-700 font-bold">
                <span>Grand Total : ${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button className="text-lg text-gray-800 font-semibold hover:text-white hover:bg-gray-800 px-2 py-1 border-2 border-black">
                Check Out
              </button>
              <button
                onClick={() => navigate("/products")}
                className="text-lg text-white bg-green-700 font-semibold hover:bg-green-600 px-2 py-1 border-2 border-black"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
