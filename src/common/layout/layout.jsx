import { useState } from 'react'
import { NavLink, Outlet} from 'react-router-dom';
import useProductData from '../../hooks/useProductData';
import { Input } from 'antd';
import useCartCount from '../../hooks/useCartCount';
import menu from '../../assets/icons/menu.svg'

const Layout = ({totalCartItems}) => {
  const { data } = useProductData('products/categories');
  const { searchTerm, searchHandler } = useCartCount();
  
  const [asideVisible, setAsideVisible] = useState(false);

  const handleMenuClick = () => {
    setAsideVisible(!asideVisible);
  };

  return (
    <div className="h-[100svh] grid grid-rows-[4rem_1fr] overflow-hidden">
      <header className="shadow-md flex items-center justify-between px-[2rem]">
        <h1 className="font-bold text-xl text-[#380C65]">TEEPEE'S STORE</h1>
        <img src={menu} alt="" onClick={handleMenuClick} className='xl:hidden ml-[5rem]' />
        <Input className='border  right-52 rounded-[0.5rem] w-[18rem] sm:hidden' placeholder='search items' onChange={searchHandler} />
      </header>
      <main className=" grid grid-cols-[13rem_1fr] sm:grid-cols-1  overflow-hidden">
        <aside className={`shadow-m overflow-auto sm:animate-[slideInDown_0.5s] sm:text-white sm:bg-[#380C65] sm:${asideVisible ? 'visible' : 'hidden'}`}>
          <div className="p-5">
            <NavLink
              className={({ isActive }) => {
                return `${isActive
                  ? "bg-purple-300 p-5 rounded-md w-full"
                  : "text-purple-600"
                  }`;
              }}
              to={"/"}
              onClick={handleMenuClick}
            >
              DASHBOARD
            </NavLink>
          </div>
          {data &&
            data.filter((item) =>
              item.toLowerCase().includes(searchTerm.toLowerCase())
            )
              .map((item, index) => (
                <div key={index} className="p-5">
                  <NavLink
                    className={({ isActive }) => {
                      return `${isActive
                        ? "bg-purple-300 p-5 rounded-md w-full"
                        : "text-purple-600 sm:text-white"
                        }`;
                    }}
                    to={item}
                    state={item}
                    onClick={handleMenuClick}
                  >
                    {item?.toUpperCase()}
                  </NavLink>
                </div>
              ))}
        </aside>
        <section className=" p-5 overflow-auto sm:w-screen ">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Layout;