/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShoppingContext } from "../Context/shopping-context";

const ProductDetailsPage = () => {
  const displayImage = useRef();
  const { id } = useParams();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddToCart,
  } = useContext(ShoppingContext);

  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await apiResponse.json();

    if (data) {
      setProductDetails(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchProductDetails();
  }, [id]);

  function handleImageOnClick(singleImage) {
    if (displayImage?.current) {
      displayImage.current.src = singleImage;
    }
  }

  if (loading)
    return (
      <h1 className="text-5xl mt-10 font-bold font-sans text-red-600 text-center">
        Loading Product Details ...
      </h1>
    );

  return (
    <section className="w-screen bg-slate-100 flex px-8 py-20 h-screen gap-4">
      <div className="flex w-1/2 flex-col items-center">
        <div>
          <img
            ref={displayImage}
            src={productDetails?.thumbnail}
            alt={productDetails?.title}
            className="w-[400px]"
          />
        </div>
        <div className="h-[150px] flex gap-2 justify-center">
          {productDetails?.images && productDetails?.images.length > 0
            ? productDetails?.images.map((singleImage) => (
                <img
                  src={singleImage || ""}
                  alt="Secondary Images"
                  key={singleImage || null}
                  className="w-[150px] bg-cover p-1 border-2 cursor-pointer hover:bg-white/50"
                  onClick={() => handleImageOnClick(singleImage)}
                />
              ))
            : null}
        </div>
      </div>

      <div className="w-2/5 p-4 flex flex-col">
        <h1 className="text-5xl font-bold font-sans">
          {productDetails?.title}
        </h1>
        <p className="text-xl mt-8 font-medium tracking-wide text-gray-800">
          {productDetails?.description}
        </p>

        <div className="flex justify-between mt-8">
          <h3 className="text-2xl font-bold">${productDetails?.price}</h3>
          <button
            onClick={() => handleAddToCart(productDetails)}
            className=" text-xl text-gray-800 font-semibold hover:text-white hover:bg-gray-800 bg-transparent px-3 py-2 border-2 border-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
