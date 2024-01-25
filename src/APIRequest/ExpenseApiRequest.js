import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
  OnChangeExpenseInput,
  ResetExpenseFormValue,
  SetExpenseList,
  SetExpenseListTotal,
  SetExpenseTypeDropDown,
} from "../redux/slice/expenseSlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// BrandListRequest
export async function ExpenseListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/expenseList/${pageNo}/${perPage}/${searchKey}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetExpenseList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetExpenseListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetExpenseList([]));
        store.dispatch(SetExpenseListTotal(0));
        ErrorToast("No Data Found");
      }
    } else {
      ErrorToast("Something Went Wrong***");
    }
  } catch (e) {
    console.log(e);
    ErrorToast("Something Went Wrong+++");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function FillExpenseFormRequest(id) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/expenseDetails/${id}`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeExpenseInput({ Name: "TypeID", Value: FormValue["TypeID"] })
      );
      store.dispatch(
        OnChangeExpenseInput({ Name: "Amount", Value: FormValue["Amount"] })
      );
      store.dispatch(
        OnChangeExpenseInput({ Name: "Note", Value: FormValue["Note"] })
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
export async function CreateUpdateExpenseRequest(postBody, objectId) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/createExpense`;
    if (objectId !== 0) {
      URL = `${BaseURL}/updateExpense/${objectId}`;
    }
    // console.log(URL);
    const result = await axios.post(URL, postBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.data["status"] === "success") {
      SuccessToast("Create Successful");
      store.dispatch(ResetExpenseFormValue());
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    console.log(e);
    ErrorToast("Something Went Wrong+++");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function ExpenseTypeDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/expenseTypeDropDown`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetExpenseTypeDropDown(result.data["data"]));
        return true;
      } else {
        store.dispatch(SetExpenseTypeDropDown([]));
        ErrorToast("No Expense Type Found");
        return false;
      }
    } else {
      ErrorToast("Something Went Wrong+");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong++");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function DeleteExpenseRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deleteExpense/${id}`;

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
