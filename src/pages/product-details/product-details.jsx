import React, { useState } from "react";
import useProductData from "../../hooks/useProductData";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Footer } from "antd/es/layout/layout";


const ProductDetails = () => {
  const { id } = useParams();
  const { data, loading } = useProductData(`products/${id}`);
  const [currentImage, setCurrentImage] = useState(null);

  return (
    <div>
      {loading ? (
        <BeatLoader color="#380C65" />
      ) : (
        <>
          {data && (
            <div className="grid grid-cols-1 xl:grid-cols-2 ">
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
                      <p><span className="font-bold">price: </span> ${data.price}</p><hr />
                      <p><span className="font-bold">Stock: </span> {data.stock}</p>

                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
             <Footer className=' text-center mt-7  bg-black text-white '>&copy; <span className=' font-medium'>teepeetech2023</span>. All Rights Reserved.
          Designed by <span className=' font-medium'>Olabode Tolulope</span></Footer>
    </div>
  );
};

export default ProductDetails;
