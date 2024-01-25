import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateUpdateBrandRequest,
  FillBrandFormRequest,
} from "../../APIRequest/BrandApiRequest";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { OnChangeBrandInput } from "../../redux/slice/brandSlice";
import store from "../../redux/store/store";

const BrandCreateUpdate = () => {
  let [ObjectID, SetObjectID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);
      (async () => {
        await FillBrandFormRequest(id);
      })();
    }
  }, []);

  const FormValue = useSelector((state) => state.brand.FormValue);

  const SaveChange = async () => {
    if (IsEmpty(FormValue.Name)) {
      ErrorToast("Brand Name Required !");
    } else {
      let result = await CreateUpdateBrandRequest(FormValue, ObjectID);
      if (result) {
        navigate("/brandList");
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h2>Save Brand</h2>
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Brand Name</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeBrandInput({
                            Name: "Name",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Name}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={SaveChange}
                      className="btn btn-sm my-3 btn-success"
                    >
                      Save Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCreateUpdate;
