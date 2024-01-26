import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CustomerListFile = lazy(() => import("../../components/Customer/CustomerList"));

const CustomerListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CustomerListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default CustomerListPage;
