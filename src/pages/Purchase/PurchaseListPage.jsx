import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const PurchaseListFile = lazy(() => import("../../components/Purchase/PurchaseList"));

const PurchaseListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default PurchaseListPage;
