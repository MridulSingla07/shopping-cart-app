/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingContext = createContext(null);

function ShoppingContextProvider({ children }) {
  //states
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  //fetching data from API

  async function fetchListOfProducts() {
    const response = await fetch("https://dummyjson.com/products");

    const data = await response.json();

    if (data && data?.products) {
      setListOfProducts(data.products);
      setLoading(false);
    }
  }

  //calling function on page load
  useEffect(() => {
    fetchListOfProducts();
    const localDT = localStorage.getItem("cart");
    if (localDT) {
      setCartItems(JSON.parse(localDT));
    }
  }, []);

  const navigate = useNavigate();

  function handleAddToCart(productData) {
    let existingCartItems = [...cartItems];
    const indexOfCurrentItem = existingCartItems.findIndex(
      (cartItem) => cartItem.id === productData.id
    );
    console.log(indexOfCurrentItem);

    // new item added
    if (indexOfCurrentItem === -1) {
      existingCartItems.push({
        ...productData,
        quantity: 1,
        totalPrice: productData?.price,
      });
    }
    // quantity of existing item increased
    else {
      // existingCartItems.filter((item) => {
      //   if (item.id === productData.id) {
      //     item.quantity++;
      //     item.totalPrice = item.price * item.quantity;
      //   }
      // });

      existingCartItems[indexOfCurrentItem] = {
        ...existingCartItems[indexOfCurrentItem],
        quantity: existingCartItems[indexOfCurrentItem].quantity + 1,
        totalPrice:
          (existingCartItems[indexOfCurrentItem].quantity + 1) *
          existingCartItems[indexOfCurrentItem].price,
      };
    }

    setCartItems(existingCartItems);
    localStorage.setItem("cart", JSON.stringify(existingCartItems));

    navigate("/shopping-cart");
  }

  function handleDeleteFromCart(productData, isFullyRemove) {
    let existingCartItems = [...cartItems];
    const indexOfCurrentItem = existingCartItems.findIndex(
      (cartItem) => cartItem.id === productData.id
    );
    console.log(indexOfCurrentItem);

    if (isFullyRemove || productData.quantity === 1) {
      existingCartItems.splice(indexOfCurrentItem, 1);
    } else {
      existingCartItems[indexOfCurrentItem] = {
        ...existingCartItems[indexOfCurrentItem],
        quantity: existingCartItems[indexOfCurrentItem].quantity - 1,
        totalPrice:
          (existingCartItems[indexOfCurrentItem].quantity - 1) *
          existingCartItems[indexOfCurrentItem].price,
      };
    }

    setCartItems(existingCartItems);
    localStorage.setItem("cart", JSON.stringify(existingCartItems));
  }

  return (
    <ShoppingContext.Provider
      value={{
        listOfProducts,
        loading,
        productDetails,
        setProductDetails,
        setLoading,
        handleAddToCart,
        cartItems,
        setCartItems,
        handleDeleteFromCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export default ShoppingContextProvider;
