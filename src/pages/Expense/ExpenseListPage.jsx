import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseListFile = lazy(() => import("../../components/Expense/ExpenseList"));

const ExpenseListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseListPage;
