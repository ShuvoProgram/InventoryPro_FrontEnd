import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateSaleRequest,
  CustomerDropDownRequest,
  ProductDropDownRequest,
} from "../../APIRequest/SalesApiRequest";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import {
  OnChangeSaleInput,
  RemoveSaleItem,
  SetSaleItemList,
} from "../../redux/slice/saleSlice";
import store from "../../redux/store/store";

const SalesCreateUpdate = () => {
  let navigate = useNavigate();
  let [data, setData] = useState({
    productId: "",
    productName: "",
    qty: "",
    unit: "",
  });

  useEffect(() => {
    (async () => {
      await CustomerDropDownRequest();
      await ProductDropDownRequest();
    })();
  }, []);

  let onChangeHandel = (e) => {
    let Name = e.target.name;
    if (Name === "productId") {
      setName(e);
    }

    setData((old) => {
      const newData = { ...old, [Name]: e.target.value };
      return newData;
    });
  };

  let setName = (e) => {
    let selectedOption = e.target.options[e.target.selectedIndex];
    let text = selectedOption.text;
    setData({ productName: text });
  };

  let CustomerDropDown = useSelector((state) => state.sale.CustomerDropDown);
  let ProductDropDown = useSelector((state) => state.sale.ProductDropDown);
  let SaleItemList = useSelector((state) => state.sale.SaleItemList);
  let SaleFormValue = useSelector((state) => state.sale.SaleFormValue);

  const OnAddCart = () => {
    // console.log(data);
    if (IsEmpty(data.productId)) {
      ErrorToast("Select Product");
    } else if (IsEmpty(data.qty)) {
      ErrorToast("Qty Required");
    } else if (IsEmpty(data.unit)) {
      ErrorToast("Unit Price Required");
    } else {
      let item = {
        ProductID: data.productId,
        ProductName: data.productName,
        Qty: data.qty,
        UnitCost: data.unit,
        Total: parseInt(data.qty) * parseInt(data.unit),
      };
      store.dispatch(SetSaleItemList(item));
    }
  };

  const removeCart = (i) => {
    store.dispatch(RemoveSaleItem(i));
  };

  const CreateNewSale = async () => {
    // Apply Validation
    if (IsEmpty(SaleFormValue.CustomerID)) {
      ErrorToast("Customer Required !");
    } else if (IsEmpty(SaleFormValue.VatTax)) {
      ErrorToast("VatTax Required !");
    } else if (IsEmpty(SaleFormValue.ShippingCost)) {
      ErrorToast("ShippingCost Required !");
    } else if (IsEmpty(SaleFormValue.GrandTotal)) {
      ErrorToast("GrandTotal Required !");
    } else {
      let result = await CreateSaleRequest(SaleFormValue, SaleItemList);
      if (result) {
        navigate("/salesList");
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="row">
                  <h5>Create Sales</h5>
                  <hr className="bg-light" />
                  <div className="col-12 p-1">
                    <label className="form-label">Customer</label>
                    <select
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
                            Name: "CustomerID",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-select form-select-sm"
                    >
                      <option value="">Select Customer</option>
                      {CustomerDropDown.map((item, i) => {
                        return (
                          <option key={i.toString()} value={item._id}>
                            {item.CustomerName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Vat/Tax</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
                            Name: "VatTax",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Discount</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
                            Name: "Discount",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Other Cost</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
                            Name: "OtherCost",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Shipping Cost</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
                            Name: "ShippingCost",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Grand Total</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
                            Name: "GrandTotal",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Note</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSaleInput({
                            Name: "Note",
                            Value: e.target.value,
                          })
                        );
                      }}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={CreateNewSale}
                      className="btn btn-sm my-3 btn-success"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-8 mb-3">
            <div className="card  h-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-6  p-1">
                    <label className="form-label">Select Product</label>
                    <select
                      name="productId"
                      onChange={onChangeHandel}
                      className="form-select form-select-sm"
                    >
                      <option value="">Select Product</option>
                      {ProductDropDown.map((item, i) => {
                        return (
                          <option key={i.toString()} value={item._id}>
                            {item.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Qty</label>
                    <input
                      name="qty"
                      onChange={onChangeHandel}
                      value={data.qty}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Unit Price</label>
                    <input
                      name="unit"
                      value={data.unit}
                      onChange={onChangeHandel}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Add Product</label>
                    <button
                      onClick={OnAddCart}
                      className="btn w-100 btn-success btn-sm"
                    >
                      Add
                      {/* <BsCartCheck /> */}
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive table-section">
                      <table className="table-sm text-center table">
                        <thead className="sticky-top bg-white">
                          <tr>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SaleItemList.map((item, i) => {
                            return (
                              <tr>
                                <td>{item.ProductName}</td>
                                <td>{item.Qty}</td>
                                <td>{item.UnitCost}</td>
                                <td>{item.Total}</td>
                                <td>
                                  <button
                                    onClick={() => removeCart(i)}
                                    className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"
                                  >
                                    <BsTrash />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
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

export default SalesCreateUpdate;
