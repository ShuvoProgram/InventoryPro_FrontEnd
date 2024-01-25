import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import { SetExpensesByDateList, SetPurchaseByDateList, SetReturnByDateList, SetSalesByDateList } from "../redux/slice/reportSlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

export async function ExpensesByDateRequest(FormData, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: new Date(FormData),
      ToDate: new Date(ToDate),
    };

    let URL = `${BaseURL}/expensesByDate`;
    const result = await axios.post(URL, PostBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetExpensesByDateList(result.data["data"]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    // console.log(e);
    ErrorToast("Something Went Wrong++");
    store.dispatch(HideLoader());
  }
}

// PurchaseByDateRequest
export async function PurchaseByDateRequest(FormData, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: new Date(FormData),
      ToDate: new Date(ToDate),
    };

    let URL = `${BaseURL}/purchaseByDate`;
    const result = await axios.post(URL, PostBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetPurchaseByDateList(result.data["data"]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    // console.log(e);
    ErrorToast("Something Went Wrong++");
    store.dispatch(HideLoader());
  }
}

// ReturnByDateRequest
export async function ReturnByDateRequest(FormData, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: new Date(FormData),
      ToDate: new Date(ToDate),
    };

    let URL = `${BaseURL}/returnByDate`;
    const result = await axios.post(URL, PostBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetReturnByDateList(result.data["data"]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    // console.log(e);
    ErrorToast("Something Went Wrong++");
    store.dispatch(HideLoader());
  }
}
// ReturnByDateRequest
export async function SaleByDateRequest(FormData, ToDate) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = {
      FormDate: new Date(FormData),
      ToDate: new Date(ToDate),
    };

    let URL = `${BaseURL}/salesByDate`;
    const result = await axios.post(URL, PostBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      store.dispatch(SetSalesByDateList(result.data["data"]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    // console.log(e);
    ErrorToast("Something Went Wrong++");
    store.dispatch(HideLoader());
  }
}
