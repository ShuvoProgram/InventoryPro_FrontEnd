import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
  OnChangeProductInput,
  ResetProductFormValue,
  SetProductBrandDropDown,
  SetProductCategoryDropDown,
  SetProductList,
  SetProductListTotal,
} from "../redux/slice/productSlice";
import { HideLoader, ShowLoader } from "../redux/slice/settingsSlice";
import store from "../redux/store/store";
const axiosConfig = { headers: { token: getToken() } };

// BrandListRequest
export async function ProductListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/productList/${pageNo}/${perPage}/${searchKey}`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetProductList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetProductListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetProductList([]));
        store.dispatch(SetProductListTotal(0));
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

export async function CreateProductRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/createProduct`;
    if (ObjectID !== 0) {
      URL = `${BaseURL}/updateProduct/${ObjectID}`;
    }
    const result = await axios.post(URL, PostBody, axiosConfig);
    store.dispatch(HideLoader());

    if (result.data["status"] === "success") {
      SuccessToast("Request Successful");
      store.dispatch(ResetProductFormValue());
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

export async function FillProductFormRequest(id) {
  try {
    store.dispatch(ShowLoader());

    let URL = `${BaseURL}/productDetails/${id}`;
    const result = await axios.get(URL, axiosConfig);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeProductInput({
          Name: "CategoryID",
          Value: FormValue["CategoryID"],
        })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "BrandID", Value: FormValue["BrandID"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Name", Value: FormValue["Name"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Unit", Value: FormValue["Unit"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Details", Value: FormValue["Details"] })
      );
      return true;
    } else {
      // debugger;
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    // debugger;
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function ProductCategoryDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/categoriesDropDown`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductCategoryDropDown(result.data["data"]));
      } else {
        store.dispatch(SetProductCategoryDropDown([]));
        ErrorToast("No Product Category Found");
      }
    } else {
      ErrorToast("Something Went Wrong+");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong++");
    store.dispatch(HideLoader());
  }
}

export async function ProductBrandDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/brandDropDown`;

    const result = await axios.get(URL, axiosConfig);
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductBrandDropDown(result.data["data"]));
      } else {
        store.dispatch(SetProductBrandDropDown([]));
        ErrorToast("No Product Brand Found");
      }
    } else {
      ErrorToast("Something Went Wrong+");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong++");
    store.dispatch(HideLoader());
  }
}

export async function DeleteProductRequest(id) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}/deleteProduct/${id}`;

    const result = await axios.get(URL, axiosConfig);    
    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    } else if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Delete Successful");
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    // console.log(e.message);
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}
