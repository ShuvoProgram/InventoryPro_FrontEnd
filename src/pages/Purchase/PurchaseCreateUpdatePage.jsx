import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const PurchaseCreateUpdateFile = lazy(() =>
  import("../../components/Purchase/PurchaseCreateUpdate")
);

const PurchaseCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default PurchaseCreateUpdatePage;
