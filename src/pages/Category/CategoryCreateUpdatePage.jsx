import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CategoryCreateUpdateFile = lazy(() => import("../../components/Category/CategoryCreateUpdate"));

const CategoryCreateUpdatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CategoryCreateUpdateFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default CategoryCreateUpdatePage;
