import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CustomerCreateUpdateFile = lazy(() => import("../../components/Customer/CustomerCreateUpdate"));

const CustomerCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CustomerCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default CustomerCreateUpdatePage;
