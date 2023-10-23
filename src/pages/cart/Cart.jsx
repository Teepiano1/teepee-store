import { useState, useEffect } from 'react';
import { Button } from 'antd';
import cartIcn from '../../assets/icons/cart.png';
import DeleteIcn from '../../assets/icons/delete.png';
import 'animate.css';
import CheckOut from '../checkout/CheckOut';

const Cart = ({ cart, setCart, onClose }) => {
  const [count, setCount] = useState(1);
  const [checkOut, setCheckOut] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [delNotification, setDelNotification] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const handleCheckOut = () => {
    setCheckOut(!checkOut);
  };

  const handleDecrement = (itemId) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 1) - 1,
    }));
  };

  const handleIncrement = (itemId) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 1) + 1,
    }));
  };

  let total = 0;
  let totalCartItems = 0;

  cart?.forEach((cartItems) => {
    const subtotal = cartItems.price * (count[cartItems.id] || 1);
    total += subtotal;
    totalCartItems += count[cartItems.id] || 1;
  });

  const deleteHandler = (itemId) => {
    setItemToDelete(itemId);
    setConfirmDel(true);
  };

  const delOkHandler = () => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemToDelete);
    setCart(updatedCart);
    setConfirmDel(false);
    setDelNotification(true);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDelNotification(false);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [delNotification]);

  return (
    <>
      <div className="absolute h-full animate-[zoomIn_1s] overflow-hidden w-full top-0 right-0 bg-white p-5 z-20 shadow-md">
        {confirmDel && (
          <div className="absolute w-full  left-0 top-0 flex justify-center z-20 bg-opacity-80 bg-black h-full">
            <div className="rounded-lg h-[6rem] w-fit m-auto animate-[fadeInRight_0.5s] px-[2rem] bg-red-600 text-white">
              <p className="pt-1">Do you want to delete item?</p>
              <br />
              <Button onClick={delOkHandler} className="text-white">
                Ok
              </Button>
              <Button onClick={()=> setConfirmDel(false)} className="text-white left-11">Cancel</Button>
            </div>
          </div>
        )}
        {delNotification && (
          <p className="w-fit p-[1rem] bg-green-500 rounded-md text-white animate-[slideInDown_0.5s] mb-[1rem] m-auto">
            Item removed successfully
          </p>
        )}
        <header className="w-full flex justify-around">
          <h2 className="text-[2rem] font-bold">Cart</h2>
          <p className="flex">
            <img src={cartIcn} className="rounded-[2rem] w-[3rem]" alt="cart icon" />
            <sub className="align-middle">{totalCartItems}</sub>
          </p>
          <p className="mt-4 cursor-pointer active:text-purple-600 sm:no-underline underline bg-white" onClick={onClose}>
            Close
          </p>
        </header>
        {cart.length === 0 ? (
          <p className="bg-white text-[4rem] text-center">Your cart is empty.</p>
        ) : (
          <div className="max-h-[86%] flex bg-white mx-[3rem] sm:m-0 flex-col">
            <div className="border border-purple-300 max-w-full animate-[fadeIn_1s] m-auto mt-[2rem] overflow-auto">
              <table>
                <thead>
                  <tr>
                    <th className="border">Product</th>
                    <th className="border">Price</th>
                    <th className="border">Quantity</th>
                    <th className="border">Subtotal</th>
                    <th className="border"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((cartItems) => (
                    <tr key={cartItems.id}>
                      <td className="text-center sm:p-0 border">
                        <img src={cartItems.src} className="w-[9rem] m-auto sm:w-[3rem]" alt="" />
                        {cartItems.name}
                      </td>
                      <td className="w-[10rem] text-center border">${cartItems.price}</td>
                      <td className="w-[10rem] text-center border">
                        <Button onClick={() => handleDecrement(cartItems.id)}>-</Button>{' '}
                        {count[cartItems.id] || 1}
                        <Button onClick={() => handleIncrement(cartItems.id)}>+</Button>{' '}
                      </td>
                      <td className="w-[10rem] text-center border">
                        ${cartItems.price * (count[cartItems.id] || 1)}
                      </td>
                      <td className="w-[10rem] border">
                        <img
                          src={DeleteIcn}
                          alt="delete"
                          className="w-[2rem] m-auto cursor-pointer"
                          onClick={() => deleteHandler(cartItems.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-[15rem] border m-auto mt-[3rem] p-[0.3rem]">
              <div className="flex justify-between">
                <p>Total Cart Items :</p>
                <p>{totalCartItems}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Shipping :</p>
                <p>free</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Total :</p>
                <p> ${total}</p>
              </div>
              <Button className="left-8 bg-[#380C65] text-white w-[10rem]" onClick={handleCheckOut}>
                CheckOut
              </Button>
            </div>
          </div>
        )}
        <Button className="mt-3 bg-[#380C65] text-white" onClick={onClose}>
          Return to Shop
        </Button>
      </div>
      {checkOut && <CheckOut checkOut={checkOut} total={total} setCheckOut={setCheckOut} totalCartItems={totalCartItems} />}
    </>
  );
};

export default Cart;