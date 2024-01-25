import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
  OnChangeCategoryInput,
  ResetCategoryFormValue,
  SetCategoryList,
  SetCategoryListTotal,
} from "../redux/slice/categorySlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// BrandListRequest
export async function CategoryListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/categoriesList/${pageNo}/${perPage}/${searchKey}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetCategoryList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetCategoryListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetCategoryList([]));
        store.dispatch(SetCategoryListTotal(0));
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

// DeleteCategoryRequest
export async function DeleteCategoryRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deleteCategories/${id}`;

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

// FillCategoryFormRequest
export async function FillCategoryFormRequest(id) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/categoriesDetails/${id}`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeCategoryInput({
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

// CreateUpdateCategoryRequest
export async function CreateUpdateCategoryRequest(postBody, objectId) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/createCategories`;
    if (objectId !== 0) {
      URL = `${BaseURL}/updateCategories/${objectId}`;
    }
    // console.log(URL);
    const result = await axios.post(URL, postBody, axiosConfig);
    store.dispatch(HideLoader());
    console.log(result);
    if (result.data["status"] === "success") {
      SuccessToast("Create Successful");
      store.dispatch(ResetCategoryFormValue());
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
