import { useState, useEffect } from 'react';
import useProductData from '../../hooks/useProductData';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigate } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useNavigate } from 'react-router-dom';

const HomeSlider = () => {
  const { data } = useProductData(`products/category/smartphones`);
  const navigate = useNavigate();
  const [slidesPerView, setSlidesPerView] = useState(2);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 758) {
  //       setSlidesPerView(1);
  //     } else {
  //       setSlidesPerView(2);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <Swiper
      className={`flex justify-center bg-black max-h-[15rem] max-w-[40rem] m-[1rem]`}
      modules={[Pagination, Autoplay]}
      spaceBetween={40}
      slidesPerView={slidesPerView}
      pagination={true}
      autoplay={true}
    >
      {data &&
        data.products.map((items) => (
          <SwiperSlide key={items.id} className=''>
            <img
              className='h-[15rem] cursor-pointer w-[40rem]'
              onClick={() => navigate(`/single-product/${items.id}`)}
              src={items.thumbnail}
              alt=''
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default HomeSlider;
