import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const PurchaseReportFile = lazy(() => import("../../components/Report/PurchaseReport"));

const PurchaseReportPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseReportFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default PurchaseReportPage;
