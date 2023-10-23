import { useLocation } from "react-router-dom";
import PageProductsView from "../../common/component/page-products-view";

const ProductByCategory = () => {
  const { state } = useLocation();
  return (
    <div>
      <PageProductsView
        pageTitle={`${state}  | TEEPEE STORE`}
        pageApiUrl={`products/category/${state?.toLowerCase()}`}
      />
    </div>
  );
};

export default ProductByCategory;
