import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SaleReportFile = lazy(() => import("../../components/Report/SaleReport"));

const SaleReportPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SaleReportFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SaleReportPage;
