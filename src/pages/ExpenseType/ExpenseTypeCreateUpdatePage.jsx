import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseTypeCreateUpdateFile = lazy(() =>
  import("../../components/ExpenseType/ExpenseTypeCreateUpdate")
);

const ExpenseTypeCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseTypeCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseTypeCreateUpdatePage;
