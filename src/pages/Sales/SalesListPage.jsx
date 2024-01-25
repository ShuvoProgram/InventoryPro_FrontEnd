import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SalesListFile = lazy(() => import("../../components/Sales/SalesList"));

const SalesListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SalesListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SalesListPage;