import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ProductCreateUpdateFile = lazy(() =>
  import("../../components/Product/ProductCreateUpdate")
);

const ProductCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ProductCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ProductCreateUpdatePage;
