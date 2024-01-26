/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BsFillCalculatorFill, BsFillLayersFill, BsBoxes, BsFillCartCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ExpensesSummary,
  PurchaseSummary,
  ReturnSummary,
  SaleSummary,
} from "../../APIRequest/DashboardApiRequest";
import { I18nProvider, useNumberFormatter } from "@react-aria/i18n";


function Currency({ value, currency }) {
  let formatter = useNumberFormatter({
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  });

  return <p className="h4">{formatter.format(value)}</p>;
}

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      await ExpensesSummary();
      await SaleSummary();
      await ReturnSummary();
      await PurchaseSummary();
    })();
  }, []);

  let ExpenseChart = useSelector((state) => state.dashboard.ExpenseChart);
  let ExpenseTotal = useSelector((state) => state.dashboard.ExpenseTotal);
  console.log(ExpenseTotal);

  let SaleChart = useSelector((state) => state.dashboard.SaleChart);
  let SaleTotal = useSelector((state) => state.dashboard.SaleTotal);

  let ReturnChart = useSelector((state) => state.dashboard.ReturnChart);
  let ReturnTotal = useSelector((state) => state.dashboard.ReturnTotal);

  let PurchaseChart = useSelector((state) => state.dashboard.PurchaseChart);
  let PurchaseTotal = useSelector((state) => state.dashboard.PurchaseTotal);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="card-body d-flex">
                <BsFillCalculatorFill
                  style={{ fontSize: "50px", color: "rebeccapurple", paddingRight: "10px" }}
                />

                <div className="h4">
                  <I18nProvider locale="en-US">
                    <Currency value={ExpenseTotal} currency="USD" />
                  </I18nProvider>
                  <h5>Total Expense</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="card-body d-flex">
                <BsBoxes
                  style={{ fontSize: "50px", color: "green", paddingRight: "10px" }}
                />
                <div className="h4">
                <I18nProvider locale="en-US">
                    <Currency value={SaleTotal} currency="USD" />
                  </I18nProvider>
                  <h5>Total Sale</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="card-body d-flex">
                <BsFillCartCheckFill
                  style={{ fontSize: "50px", color: "hotpink", paddingRight: "10px" }}
                />
                <div className="h4">
                <I18nProvider locale="en-US">
                    <Currency value={PurchaseTotal} currency="USD" />
                  </I18nProvider>
                  <h5>Total Purchase</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="card-body d-flex">
                <BsFillLayersFill
                  style={{ fontSize: "50px", color: "darkred", paddingRight: "10px" }}
                />
                <div className="h4">
                <I18nProvider locale="en-US">
                    <Currency value={ReturnTotal} currency="USD" />
                  </I18nProvider>
                  
                  <h5>Total Return</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h4">Expense Report Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={ExpenseChart}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="TotalAmount"
                      stroke="#CB0C9F"
                      fill="#CB0C9F"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h4">Sales Report Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={SaleChart}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="TotalAmount"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h4">Purchase Report Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={PurchaseChart}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="TotalAmount"
                      stroke="#00A884"
                      fill="#00A884"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h4">Return Report Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={ReturnChart}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="TotalAmount"
                    // stroke="#CB0C9F"
                    // fill="#CB0C9F"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;