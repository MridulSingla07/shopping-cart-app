import { useContext } from "react";
import { ShoppingContext } from "../Context/shopping-context";
import ProductTile from "../Components/ProductTile";
import NavButtons from "../Components/NavButtons";

const ProductListPage = () => {
  // consuming the context in ProductListPage
  const { listOfProducts, loading } = useContext(ShoppingContext);

  if (loading) {
    return (
      <h2 className="text-5xl mt-10 font-bold font-sans text-red-600 text-center">
        Loading New Arrivals...
      </h2>
    );
  }

  return (
    <>
      <section className="w-full bg-slate-100 flex flex-col gap-10 px-8 py-10 align-middle justify-center">
        <div className="relative">
          <h1 className="text-5xl font-bold font-sans text-gray-800 text-center underline decoration-blue-800 decoration-8 underline-offset-[10px]	">
            New Products ...
          </h1>
          <NavButtons />
        </div>
        <div>
          {listOfProducts.length == 0 ? (
            <h2 className="text-4xl mt-10 font-bold font-sans text-red-600 text-center">
              No Product Found
            </h2>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {listOfProducts && listOfProducts.length > 0
              ? listOfProducts.map((singleProduct) => (
                  <ProductTile
                    key={singleProduct?.id}
                    product={singleProduct}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListPage;
