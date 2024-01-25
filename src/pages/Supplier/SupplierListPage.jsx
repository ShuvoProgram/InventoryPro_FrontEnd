import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SupplierListFile = lazy(() =>
  import("../../components/Supplier/SupplierList")
);
const SupplierListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SupplierListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SupplierListPage;
