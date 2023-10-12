import React, { useState } from "react";
import useProductData from "../../hooks/useProductData";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Button } from "antd";
import useCartCount from "../../hooks/useCartCount";
import Cart from "../cart/Cart";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, loading } = useProductData(`products/${id}`);
  const [currentImage, setCurrentImage] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItemCount, setcartItemCount] = useState(1);

  const { addToCart, cart, setCart} = useCartCount(cartVisible, setCartVisible, cartItemCount, setcartItemCount)


  return (
    <div>
      {loading ? (
        <BeatLoader color="#380C65" />
      ) : (
        <>
          {data && (
            <div className="grid grid-cols-2 ">
              <div>
                <img src={currentImage ? currentImage : data.thumbnail} className="h-[15rem] animate-[fadeInRight_1s] object-contain" alt="" />
                <div className="flex items-center justify-evenly mt-10">
                  {data.images?.map((image, index) => (
                    <span key={index}>
                      <img src={image} onClick={() => setCurrentImage(image)} alt="" className="w-10 cursor-pointer animate-[fadeInRight_1s] hover:scale-90 h-10" />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                {data && (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold">{data.title}</h1>
                    </div>
                  </>
                )}
              </div>
              <div className=" animate-[fadeInUp_1s]">
                {data && (
                  <>
                    <div className="leading-9 text-[1.2rem]">
                      <p><span className="font-bold">Description: </span>{data.description}</p><hr />
                      <p><span className="font-bold">Brand: </span> {data.brand}</p><hr />
                      <p><span className="font-bold">price: </span> ${data.price}</p>
                      <p><span className="font-bold">Stock: </span> {data.stock}</p>

                    </div>
                    <Button
                      className="  bg-[#380C65] shadow-md hover:scale-90 hover:transition-all text-white font-semibold rounded-md py-1"
                      onClick={() => addToCart(data.id, data.thumbnail, data.title, data.price)}
                    >
                      Add to Cart</Button>
                    {cartVisible && (
                      <Cart onClose={() => setCartVisible(!cartVisible)} cartItemCount={cartItemCount} cart={cart} setCart={setCart} setcartItemCount={setcartItemCount} />
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
