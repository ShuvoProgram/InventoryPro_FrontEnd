import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseReportFile = lazy(() => import("../../components/Report/ExpenseReport"));

const ExpenseReportPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseReportFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseReportPage;
