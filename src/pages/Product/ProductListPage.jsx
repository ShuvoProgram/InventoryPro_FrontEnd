import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ProductListFile = lazy(() => import("../../components/Product/ProductList"));

const ProductListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ProductListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ProductListPage;
