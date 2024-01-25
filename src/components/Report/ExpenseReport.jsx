import exportFromJSON from "export-from-json";
import moment from "moment";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { ExpensesByDateRequest } from "../../APIRequest/ReportApiRequest";
import dataFound from "../../assets/img/dat.png";
import dataNot from "../../assets/img/dataNot.png";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";

const ExpenseReport = () => {
  let DataList = useSelector((state) => state.report.ExpensesByDateList);
  const [date, setDate] = useState({ formDate: "", toDate: "" });

  const handelChange = (e) => {
    let Name = e.target.name;
    setDate((oldValue) => {
      return { ...oldValue, [Name]: e.target.value };
    });
  };

  const CreateReport = async () => {
    if (IsEmpty(date.formDate)) {
      ErrorToast("Form Date Required");
    } else if (IsEmpty(date.toDate)) {
      ErrorToast("To Date Required");
    } else {
      await ExpensesByDateRequest(date.formDate, date.toDate);
    }
  };

  const OnExport = (exportType, data) => {
    const fileName = "ExpenseReport";
    if (data.length > 0) {
      let ReportData = [];
      data.map((item) => {
        let listItem = {
          Amount: item["Amount"],
          Note: item["Note"],
          Category: item["Type"][0]["Name"],
          Date: moment(item["CreatedDate"]).format("MMMM Do YYYY"),
        };
        ReportData.push(listItem);
      });
      exportFromJSON({
        data: ReportData,
        fileName: fileName,
        exportType: exportType,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>Expense Report by Date</h5>
                <hr className="bg-light" />

                <div className="col-4 p-2">
                  <label className="form-label">Date Form:</label>
                  <input
                    name="formDate"
                    value={date.formDate}
                    onChange={handelChange}
                    className="form-control form-control-sm"
                    type="date"
                  />
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Date To:</label>
                  <input
                    name="toDate"
                    value={date.toDate}
                    onChange={handelChange}
                    className="form-control form-control-sm"
                    type="date"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={CreateReport}
                    className="btn btn-sm my-3 btn-success"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {DataList.length > 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <img
                      src={dataFound}
                      alt="Data found!"
                      style={{ width: "500px" }}
                    />
                    <h6>
                      Total:{" "}
                      {DataList[0]["Total"].length > 0 ? (
                        <CurrencyFormat
                          value={DataList[0]["Total"][0]["TotalAmount"]}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      ) : (
                        0
                      )}{" "}
                    </h6>
                    <button
                      onClick={() => OnExport("csv", DataList[0]["Rows"])}
                      className="btn btn-sm my-2 btn-success"
                    >
                      Download CSV
                    </button>
                    <button
                      onClick={() => OnExport("xls", DataList[0]["Rows"])}
                      className="btn btn-sm my-2 ms-2 btn-success"
                    >
                      Download XLS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img src={dataNot} alt="Data not found!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseReport;
