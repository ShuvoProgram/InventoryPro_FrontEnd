import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateUpdateExpenseTypeRequest,
  FillExpenseTypeFormRequest,
} from "../../APIRequest/ExpenseTypeApiRequest";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { OnChangeExpenseTypeInput } from "../../redux/slice/expensetypeSlice";
import store from "../../redux/store/store";

const ExpenseTypeCreateUpdate = () => {
  let [ObjectID, SetObjectID] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);
      (async () => {
        await FillExpenseTypeFormRequest(id);
      })();
    }
  }, []);

  const FormValue = useSelector((state) => state.expenseType.FormValue);

  const SaveChange = async () => {
    if (IsEmpty(FormValue.Name)) {
      ErrorToast("ExpenseType Name Required !");
    } else {
      let result = await CreateUpdateExpenseTypeRequest(FormValue, ObjectID);
      if (result) {
        navigate("/expenseTypeList");
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
                  <h2>Save ExpenseType</h2>
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">ExpenseType Name</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeExpenseTypeInput({
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

export default ExpenseTypeCreateUpdate;
