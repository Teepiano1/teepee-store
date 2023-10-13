import HomeSlider from "../../common/component/HomeSlider";
import PageProductsView from "../../common/component/page-products-view";
import useProductData from "../../hooks/useProductData";

const Dashboard = () => {
  const {loading, data} = useProductData('products/categories')
  return (
    <div>
    <HomeSlider/> 
     {loading? (
      ""
     ): (
<h1 className=" text-[2rem] m-[2rem]">Shop</h1> )}
<PageProductsView
  pageTitle="Dashboard | BEND DOWN SELECT"
  pageApiUrl="products"
/>
    </div>
  );
};

export default Dashboard;
