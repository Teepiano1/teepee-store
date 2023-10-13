import { useLayoutEffect, useState } from "react";
import useProductData from "../../hooks/useProductData";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import useCartCount from "../../hooks/useCartCount";
import { Button, Input } from "antd";
import Cart from "../../pages/cart/Cart";
import Search from "antd/es/input/Search";
import { Footer } from "antd/es/layout/layout";

const PageProductsView = (props) => {
  const { data, loading } = useProductData(props.pageApiUrl);

  useLayoutEffect(() => {
    document.title = props.pageTitle;
  }, [props.pageTitle]);

  const navigate = useNavigate();
  const [cartVisible, setCartVisible] = useState(false);
  const { addToCart, cart, setCart, home, setHome, cartItemCount, setcartItemCount, searchTerm, searchHandler } = useCartCount(cartVisible, setCartVisible)
  const closeHandler = () => {
    setCartVisible(!cartVisible)
    setHome(true)
  }
  return (
    <div className="flex flex-col h-full">
      {cartVisible && (<div>
        <Cart onClose={closeHandler} cartItemCount={cartItemCount} cart={cart} setCart={setCart} setcartItemCount={setcartItemCount} />
      </div>
      )}
      {loading ? (
        <BeatLoader color="#380C65" />
      ) : (<>
        {home && (
          <div className="flex items-center justify-center h-full  ">
            <section className="flex items-center  gap-x-5 gap-y-16 justify-between flex-wrap h-full">
              <Search className="w-[17rem] xl:hidden" placeholder="what are you looking for?" onChange={searchHandler} />
              {data &&
                data.products?.filter((item) =>
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                  .map((item, index) => (
                    <div key={index} className="w-[14rem] h-[18rem]  relative sm:max-w-[46%] md:h-[14rem] bg-white rounded-md">
                      <p className=" absolute right-[0rem] text-white rounded-md bg-purple-600">{item.discountPercentage}% off</p>
                      <img src={item.thumbnail} onClick={() => navigate(`/single-product/${item.id}`)}
                        className="h-[60%] w-[14rem] rounded-md cursor-pointer" alt="" />
                      <div className="flex flex-col justify-between pt-[0.5rem] leading-6">
                        <p>{item.title}</p>
                        <p className="text-[#380C65]">${item.price}</p>
                      </div>
                      <div className=" flex flex-col">
                        {/* <Link to='/cart'> */}
                        <Button
                          className="w-full absolute  bottom-0 bg-[#380C65] shadow-md hover:scale-90 hover:transition-all text-white font-semibold rounded-md py-1"
                          onClick={() => addToCart(item.id, item.thumbnail, item.title, item.price)}>
                          Add to Cart</Button>
                      </div>
                    </div>
                  ))}

            </section>
          </div>
        )}
        <Footer className=' text-center mt-9  bg-black text-white '>&copy; <span className=' font-medium'>teepeetech2023</span>. All Rights Reserved.
          Designed by <span className=' font-medium'>Olabode Tolulope</span></Footer>
      </>)}
    </div>
  );
};

export default PageProductsView;
