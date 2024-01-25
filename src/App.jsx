import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";
import { getToken } from "./helper/SessionHelper";
import BrandCreateUpdatePage from "./pages/Brand/BrandCreateUpdatePage";
import BrandListPage from "./pages/Brand/BrandListPage";
import CategoryCreateUpdatePage from "./pages/Category/CategoryCreateUpdatePage";
import CategoryListPage from "./pages/Category/CategoryListPage";
import CustomerCreateUpdatePage from "./pages/Customer/CustomerCreateUpdatePage";
import CustomerListPage from "./pages/Customer/CustomerListPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ExpenseCreateUpdatePage from "./pages/Expense/ExpenseCreateUpdatePage";
import ExpenseListPage from "./pages/Expense/ExpenseListPage";
import ExpenseTypeCreateUpdatePage from "./pages/ExpenseType/ExpenseTypeCreateUpdatePage";
import ExpenseTypeListPage from "./pages/ExpenseType/ExpenseTypeListPage";
import Page404 from "./pages/NotFound/Page404";
import ProductCreateUpdatePage from "./pages/Product/ProductCreateUpdatePage";
import ProductListPage from "./pages/Product/ProductListPage";
import PurchaseCreateUpdatePage from "./pages/Purchase/PurchaseCreateUpdatePage";
import PurchaseListPage from "./pages/Purchase/PurchaseListPage";
import ExpenseReportPage from "./pages/Report/ExpenseReportPage";
import PurchaseReportPage from "./pages/Report/PurchaseReportPage";
import ReturnReportPage from "./pages/Report/ReturnReportPage";
import SaleReportPage from "./pages/Report/SaleReportPage";
import ReturnCreateUpdatePage from "./pages/Return/ReturnCreateUpdatePage";
import ReturnListPage from "./pages/Return/ReturnListPage";
import SalesCreateUpdatePage from "./pages/Sales/SalesCreateUpdatePage";
import SalesListPage from "./pages/Sales/SalesListPage";
import SupplierCreateUpdatePage from "./pages/Supplier/SupplierCreateUpdatePage";
import SupplierListPage from "./pages/Supplier/SupplierListPage";
import CreatePasswordPage from "./pages/Users/CreatePasswordPage";
import LoginPage from "./pages/Users/LoginPage";
import ProfilePage from "./pages/Users/ProfilePage";
import RegistrationPage from "./pages/Users/RegistrationPage";
import SendOTPPage from "./pages/Users/SendOTPPage";
import VerifyOTPPage from "./pages/Users/VerifyOTPPage";

const App = () => {
  if (getToken()) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/brandCreateUpdate"
              element={<BrandCreateUpdatePage />}
            />
            <Route path="/brandList" element={<BrandListPage />} />

            <Route
              path="/categoryCreateUpdate"
              element={<CategoryCreateUpdatePage />}
            />
            <Route exact path="/categoryList" element={<CategoryListPage />} />

            <Route
              path="/customerCreateUpdate"
              element={<CustomerCreateUpdatePage />}
            />
            <Route path="/customerList" element={<CustomerListPage />} />

            <Route
              path="/expenseTypeCreateUpdate"
              element={<ExpenseTypeCreateUpdatePage />}
            />
            <Route path="/expenseTypeList" element={<ExpenseTypeListPage />} />

            <Route
              path="/expenseCreateUpdate"
              element={<ExpenseCreateUpdatePage />}
            />
            <Route path="/expenseList" element={<ExpenseListPage />} />

            <Route
              path="/productCreateUpdate"
              element={<ProductCreateUpdatePage />}
            />
            <Route path="/productList" element={<ProductListPage />} />

            <Route
              path="/purchaseCreateUpdate"
              element={<PurchaseCreateUpdatePage />}
            />
            <Route path="/purchaseList" element={<PurchaseListPage />} />

            <Route
              path="/returnCreateUpdate"
              element={<ReturnCreateUpdatePage />}
            />
            <Route path="/returnList" element={<ReturnListPage />} />

            <Route
              path="/salesCreateUpdate"
              element={<SalesCreateUpdatePage />}
            />
            <Route path="/salesList" element={<SalesListPage />} />

            <Route
              path="/supplierCreateUpdate"
              element={<SupplierCreateUpdatePage />}
            />
            <Route path="/supplierList" element={<SupplierListPage />} />

            <Route path="/purchaseReport" element={<PurchaseReportPage />} />
            <Route path="/returnReport" element={<ReturnReportPage />} />
            <Route path="/saleReport" element={<SaleReportPage />} />
            <Route path="/expenseReport" element={<ExpenseReportPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
        <Toaster />
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sendOtp" element={<SendOTPPage />} />
            <Route path="/verifyOtp" element={<VerifyOTPPage />} />
            <Route path="/createPassword" element={<CreatePasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
        <Toaster />
      </>
    );
  }
};

export default App;
