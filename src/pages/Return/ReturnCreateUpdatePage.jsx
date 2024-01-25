import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ReturnCreateUpdateFile = lazy(() =>
  import("../../components/Return/ReturnCreateUpdate")
);

const ReturnCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ReturnCreateUpdatePage;
