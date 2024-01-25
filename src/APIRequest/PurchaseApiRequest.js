import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
  SetProductDropDown,
    SetPurchaseList, SetPurchaseListTotal, SetSupplierDropDown
} from "../redux/slice/purchaseSlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// BrandListRequest
export async function PurchaseListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/purchasesList/${pageNo}/${perPage}/${searchKey}`;
// console.log(URL)
    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetPurchaseList(result.data["data"][0]["Rows"]));
        store.dispatch(
            SetPurchaseListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetPurchaseList([]));
        store.dispatch(SetPurchaseListTotal(0));
        ErrorToast("No Data Found");
      }
    } else {
      ErrorToast("Something Went Wrong***");
    }
  } catch (e) {
    console.log(e);
    ErrorToast("Something Went Wrong+++");
    store.dispatch(HideLoader());
  }
}
 

export async function SuppliersDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    
    let URL = `${BaseURL}/suppliersDropDown`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetSupplierDropDown(result.data["data"]));
      } else {
        store.dispatch(SetSupplierDropDown([]));
        ErrorToast("No Customer Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}

export async function ProductDropDownRequest() {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/productDropDown`;
    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductDropDown(result.data["data"]));
      } else {
        store.dispatch(SetProductDropDown([]));
        ErrorToast("No Product Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}

export async function CreatePurchaseRequest(ParentBody, ChildBody) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = { Parent: ParentBody, Childe: ChildBody };
    let URL = `${BaseURL}/createPurchases`;

    const result = await axios.post(URL, PostBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

// DeleteReturnRequest
export async function DeletePurchaseRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deletePurchase/${id}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    }
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Delete Successful");
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    // console.log(e);
    ErrorToast("Something Went Wrong+++");
    store.dispatch(HideLoader());
    return false;
  }
}

