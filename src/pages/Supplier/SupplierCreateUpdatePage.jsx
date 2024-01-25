import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SupplierCreateUpdateFile = lazy(() =>
  import("../../components/Supplier/SupplierCreateUpdate")
);

const SupplierCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SupplierCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SupplierCreateUpdatePage;
