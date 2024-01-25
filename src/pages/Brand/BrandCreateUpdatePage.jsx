import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const BrandCreateUpdateFile = lazy(() =>
  import("../../components/Brand/BrandCreateUpdate")
);

const BrandCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <BrandCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default BrandCreateUpdatePage;
