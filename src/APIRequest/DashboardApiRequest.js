import axios from "axios";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import { getToken } from "../helper/SessionHelper";
import store from "../redux/store/store";
import { BaseURL } from "../helper/config";
import {
  SetExpenseChart,
  SetExpenseTotal,
  SetPurchaseChart,
  SetPurchaseTotal,
  SetReturnChart,
  SetReturnTotal,
  SetSaleChart,
  SetSaleTotal,
} from "../redux/slice/dashboardSlice";
import { ErrorToast } from "../helper/FormHelper";
const axiosConfig = { headers: { token: getToken() } };

export async function ExpensesSummary() {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/expensesSummary`;

    let res = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(SetExpenseChart(res.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetExpenseTotal(res.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

export async function ReturnSummary() {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/returnSummary`;
    let res = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(SetReturnChart(res.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetReturnTotal(res.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

export async function SaleSummary() {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/salesSummary`;
    let res = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(SetSaleChart(res.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetSaleTotal(res.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

export async function PurchaseSummary() {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/purchaseSummary`;
    let res = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(SetPurchaseChart(res.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetPurchaseTotal(res.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}
