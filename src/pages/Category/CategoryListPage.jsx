import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CategoryListFile = lazy(() => import("../../components/Category/CategoryList"));

const CategoryListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CategoryListFile />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default CategoryListPage;
