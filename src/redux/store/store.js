import { configureStore } from "@reduxjs/toolkit";

import brandReducer from "../slice/brandSlice";
import categoryReducer from "../slice/categorySlice";
import customerReducer from "../slice/customerSlice";
import dashboardReducer from "../slice/dashboardSlice";
import expenseReducer from "../slice/expenseSlice";
import expenseTypeReducer from "../slice/expensetypeSlice";
import productReducer from "../slice/productSlice";
import profileReducer from "../slice/profileSlice";
import purchaseReducer from "../slice/purchaseSlice";
import reportReducer from "../slice/reportSlice";
import returnReducer from "../slice/returnSlice";
import saleReducer from "../slice/saleSlice";
import settingsReducer from "../slice/settingsSlice";
import supplierReducer from "../slice/supplierSlice";

export default configureStore({
  reducer: {
    settings: settingsReducer,
    profile: profileReducer,
    brand: brandReducer,
    category: categoryReducer,
    customer: customerReducer,
    dashboard: dashboardReducer,
    expense: expenseReducer,
    expenseType: expenseTypeReducer,
    product: productReducer,
    purchase: purchaseReducer,
    return: returnReducer,
    sale: saleReducer,
    supplier: supplierReducer,
    report: reportReducer,
  },
});
