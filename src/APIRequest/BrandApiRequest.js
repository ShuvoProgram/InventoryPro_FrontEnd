import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
  OnChangeBrandInput,
  ResetBrandFormValue,
  SetBrandList,
  SetBrandListTotal,
} from "../redux/slice/brandSlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// BrandListRequest
export async function BrandListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/brandList/${pageNo}/${perPage}/${searchKey}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetBrandList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetBrandListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetBrandList([]));
        store.dispatch(SetBrandListTotal(0));
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

// DeleteBrandRequest
export async function DeleteBrandRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deleteBrand/${id}`;

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

// FillExpenseTypeFormRequest
export async function FillBrandFormRequest(id) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/brandDetails/${id}`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeBrandInput({
          Name: "Name",
          Value: FormValue["Name"],
        })
      );
      return true;
    } else {
      // debugger;
      ErrorToast("Request Fail ! Try Again++");
      return false;
    }
  } catch (e) {
    // console.log(e);
    ErrorToast("Something Went Wrong+++");
    store.dispatch(HideLoader());
    return false;
  }
}

// CreateUpdateExpenseTypeRequest
export async function CreateUpdateBrandRequest(postBody, objectId) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/createBrand`;
    if (objectId !== 0) {
      URL = `${BaseURL}/updateBrand/${objectId}`;
    }

    const result = await axios.post(URL, postBody, axiosConfig);

    store.dispatch(HideLoader());

    if (result.data["status"] === "success") {
      SuccessToast("Create Successful");
      store.dispatch(ResetBrandFormValue());
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
