import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
import { CreateUpdateSupplierRequest, FillSupplierFormRequest } from "../../APIRequest/SupplierApiRequest";
import store from "../../redux/store/store";
import { OnChangeSupplierInput } from "../../redux/slice/supplierSlice";

const SupplierCreateUpdate = () => {
  let [ObjectID, SetObjectID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);
      (async () => {
        await FillSupplierFormRequest(id);
      })();
    }
  }, []);

  const FormValue = useSelector((state) => state.supplier.FormValue);

  const SaveChange = async () => {
    if (IsEmpty(FormValue.Name)) {
      ErrorToast("Customer Name Required !");
    } else if (IsEmpty(FormValue.Phone)) {
      ErrorToast("Customer Phone  Number Required !");
    } else if (IsEmail(FormValue.Email)) {
      ErrorToast("Valid Email Address Required !");
    } else {
      let result = await CreateUpdateSupplierRequest(FormValue, ObjectID);
      if (result) {
        navigate("/supplierList");
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
                  <h5>Save Supplier</h5>
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Supplier Name</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
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
                  <div className="col-4 p-2">
                    <label className="form-label">Mobile No</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
                            Name: "Phone",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Phone}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Email </label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
                            Name: "Email",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Email}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-12 p-2">
                    <label className="form-label">Address</label>
                    <textarea
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
                            Name: "Address",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Address}
                      className="form-control form-control-sm"
                      rows={4}
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

export default SupplierCreateUpdate;