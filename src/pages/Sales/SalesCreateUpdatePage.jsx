import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SalesCreateUpdateFile = lazy(() =>
  import("../../components/Sales/SalesCreateUpdate")
);

const SalesCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SalesCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SalesCreateUpdatePage;
