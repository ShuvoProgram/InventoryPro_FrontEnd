import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseTypeListFile = lazy(() =>
  import("../../components/ExpenseType/ExpenseTypeList")
);

const ExpenseTypeListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseTypeListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseTypeListPage;
