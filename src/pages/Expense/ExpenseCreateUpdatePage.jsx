import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseCreateUpdateFile = lazy(() =>
  import("../../components/Expense/ExpenseCreateUpdate")
);

const ExpenseCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseCreateUpdatePage;
