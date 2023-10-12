import { useState } from 'react';

const useCartCount = (cartVisible, setCartVisible) => {
  const [searchTerm, setSearchTerm] = useState("");
const searchHandler = (e)=>{
  setSearchTerm(e.target.value)
}
  

const [cart, setCart] = useState([]);

const addToCart = (id, image, name, price)=>{
  setCartVisible(!cartVisible);
     const item = {
      id: id,
      src: image,
      name: name,
      price: price
    };
  setCart(prevCart => [...prevCart, item]);
}



return { addToCart, cart, setCart, cartVisible, searchTerm, searchHandler};
};

export default useCartCount;
