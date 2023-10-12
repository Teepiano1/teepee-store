import { useLocation } from "react-router-dom";
import PageProductsView from "../../common/component/page-products-view";

const ProductByCategory = () => {
  const { state } = useLocation();
  return (
    <PageProductsView
      pageTitle={`${state}  | BEND DOWN SELECT`}
      pageApiUrl={`products/category/${state?.toLowerCase()}`}
    />
  );
};

export default ProductByCategory;
