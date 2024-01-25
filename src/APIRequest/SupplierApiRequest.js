import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import {
  OnChangeSupplierInput,
  ResetSupplierFormValue,
  SetSupplierList,
  SetSupplierListTotal,
} from "../redux/slice/supplierSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// SupplierListRequest
export async function SupplierListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/suppliersList/${pageNo}/${perPage}/${searchKey}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetSupplierList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetSupplierListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetSupplierList([]));
        store.dispatch(SetSupplierListTotal(0));
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
export async function CreateUpdateSupplierRequest(postBody, objectId) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/createSuppliers`;
    if (objectId !== 0) {
      URL = `${BaseURL}/updateSuppliers/${objectId}`;
    }
    // console.log(URL);
    const result = await axios.post(URL, postBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.data["status"] === "success") {
      SuccessToast("Create Successful");
      store.dispatch(ResetSupplierFormValue());
      return true;
    } else if (result.data["status"] === "fail") {
      ErrorToast("Mobile Number Already Exist!");
      return false;
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

// FillSupplierFormRequest
export async function FillSupplierFormRequest(id) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/supplierDetails/${id}`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeSupplierInput({
          Name: "Name",
          Value: FormValue["Name"],
        })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Phone", Value: FormValue["Phone"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Email", Value: FormValue["Email"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Address", Value: FormValue["Address"] })
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

// DeleteSupplierRequest
export async function DeleteSupplierRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deleteSupplier/${id}`;

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
