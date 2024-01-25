import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ReturnReportFile = lazy(() =>
  import("../../components/Report/ReturnReport")
);

const ReturnReportPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnReportFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ReturnReportPage;
