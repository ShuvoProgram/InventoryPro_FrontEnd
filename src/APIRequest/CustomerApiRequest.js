import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
  ResetFormValue,
  SetCustomerList,
  SetCustomerListTotal,
  SetOnChangeInput,
} from "../redux/slice/customerSlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// BrandListRequest
export async function CustomerListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/customersList/${pageNo}/${perPage}/${searchKey}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetCustomerList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetCustomerListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetCustomerList([]));
        store.dispatch(SetCustomerListTotal(0));
        ErrorToast("No Data Found");
      }
    } else {
      ErrorToast("Something Went Wrong***");
    }
  } catch (e) {
    // console.log(e);
    ErrorToast("Something Went Wrong+++");
    store.dispatch(HideLoader());
  }
}

// CreateUpdateRequest
export async function CreateUpdateRequest(postBody, objectId) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/createCustomers`;
    if (objectId !== null) {
      URL = `${BaseURL}/updateCustomers/${objectId}`;
    }
    const result = await axios.post(URL, postBody, axiosConfig);
  
    store.dispatch(HideLoader());

    if (result.data["status"] === "success") {
      SuccessToast("Create Successful");
      store.dispatch(ResetFormValue());
      return true;
    } else if (result.data["status"] === "fail") {
      ErrorToast("Mobile Number Already Exist!");
      return false;
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

// CreateUpdateRequest
export async function DeleteCustomerRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deleteCustomers/${id}`;

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

export async function FillCustomerFormRequest(id) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/customersDetails/${id}`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        SetOnChangeInput({
          Name: "CustomerName",
          Value: FormValue["CustomerName"],
        })
      );
      store.dispatch(
        SetOnChangeInput({ Name: "Phone", Value: FormValue["Phone"] })
      );
      store.dispatch(
        SetOnChangeInput({ Name: "Email", Value: FormValue["Email"] })
      );
      store.dispatch(
        SetOnChangeInput({ Name: "Address", Value: FormValue["Address"] })
      );
      return true;
    } else {
      // debugger;
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
