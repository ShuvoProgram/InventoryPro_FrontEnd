import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ReturnListFile = lazy(() => import("../../components/Return/ReturnList"));

const ReturnListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ReturnListPage;
