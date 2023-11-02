import HomeSlider from "../../common/component/HomeSlider";
import PageProductsView from "../../common/component/page-products-view";
import useProductData from "../../hooks/useProductData";

const Dashboard = () => {

  const { loading, data } = useProductData('products/categories')
  return (
    <div>
      <HomeSlider />
      {loading ? (
        ""
      ) : (
        <h1 className=" text-[1.5rem] m-[2rem]">New Arrivals</h1>)}
      <PageProductsView
        pageTitle="Shop | TEEPEE STORE"
        pageApiUrl="products"
      />
    </div>
  );
};

export default Dashboard;
