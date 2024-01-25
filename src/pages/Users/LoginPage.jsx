import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const Login = lazy(() => import("../../components/Users/Login"));

const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    </>
  );
};

export default LoginPage;
