import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
  OnChangeExpenseTypeInput,
  ResetExpenseTypeFormValue,
  SetExpenseTypeList,
  SetExpenseTypeListTotal,
} from "../redux/slice/expensetypeSlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// ExpenseTypeListRequest
export async function ExpenseTypeListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/expenseTypeList/${pageNo}/${perPage}/${searchKey}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetExpenseTypeList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetExpenseTypeListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetExpenseTypeList([]));
        store.dispatch(SetExpenseTypeListTotal(0));
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

// CreateUpdateExpenseTypeRequest
export async function CreateUpdateExpenseTypeRequest(postBody, objectId) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/createExpenseType`;
    if (objectId !== 0) {
      URL = `${BaseURL}/updateExpenseType/${objectId}`;
    }
    // console.log(URL);
    const result = await axios.post(URL, postBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.data["status"] === "success") {
      SuccessToast("Create Successful");
      store.dispatch(ResetExpenseTypeFormValue());
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
export async function FillExpenseTypeFormRequest(id) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/expenseTypeDetails/${id}`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeExpenseTypeInput({
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

// DeleteExpenseTypeRequest
export async function DeleteExpenseTypeRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deleteExpenseType/${id}`;

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
