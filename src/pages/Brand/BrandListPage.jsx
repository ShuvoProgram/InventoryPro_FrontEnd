import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const BrandListFile = lazy(() => import("../../components/Brand/BrandList"));

const BrandListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <BrandListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default BrandListPage;