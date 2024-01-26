import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const Dashboard = lazy(() => import("../../components/Dashboard/Dashboard"));

const DashboardPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Dashboard />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default DashboardPage;
