/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { I18nProvider, useNumberFormatter } from "@react-aria/i18n";
import { Link } from "react-router-dom";
import {
  DeleteSaleRequest,
  SaleListRequest,
} from "../../APIRequest/SalesApiRequest";

const SalesList = () => {
  let [searchKey, setSearchKey] = useState("0");
  let [perPage, setPerPage] = useState(20);

  useEffect(() => {
    (async () => {
      await SaleListRequest(1, perPage, searchKey);
    })();
  }, []);

  let DataList = useSelector((state) => state.sale.List);
  let Total = useSelector((state) => state.sale.ListTotal);

  const handlePageClick = async (event) => {
    await SaleListRequest(event.selected + 1, perPage, searchKey);
  };
  const searchData = async () => {
    await SaleListRequest(1, perPage, searchKey);
  };
  const perPageOnChange = async (e) => {
    setPerPage(parseInt(e.target.value));
    await SaleListRequest(1, e.target.value, searchKey);
  };
  const searchKeywordOnChange = async (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
      await SaleListRequest(1, perPage, "0");
    }
  };

  const TextSearch = (e) => {
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.style.display = row.innerText.includes(e.target.value) ? "" : "none";
    });
  };

  const DeleteItem = async (id) => {
    let Result = await DeleteAlert();
    if (Result.isConfirmed) {
      let DeleteResult = await DeleteSaleRequest(id);
      if (DeleteResult) {
        await SaleListRequest(1, perPage, searchKey);
      }
    }
  };

  function Currency({ value, currency }) {
    let formatter = useNumberFormatter({
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    });

    return <p>{formatter.format(value)}</p>;
  }

  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-4">
                      <h5>Sale List</h5>
                    </div>

                    <div className="col-2">
                      <input
                        onKeyUp={TextSearch}
                        placeholder="Text Filter"
                        className="form-control form-control-sm"
                      />
                    </div>

                    <div className="col-2">
                      <select
                        onChange={perPageOnChange}
                        className="form-control mx-2 form-select-sm form-select form-control-sm"
                      >
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="200">200 Per Page</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <input
                          onChange={searchKeywordOnChange}
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search.."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          onClick={searchData}
                          className="btn  btn-success btn-sm mb-0"
                          type="button"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive table-section">
                        <table className="table ">
                          <thead className="sticky-top bg-white">
                            <tr>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                #No
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Supplier
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Grand Total
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Shipping Cost
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Vat/Tax
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Other Cost
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Discount
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Date
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Action
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {DataList.map((item, i) => (
                              <tr key={i.toString()}>
                                <td>
                                  <p className="text-xs text-start">{i + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.customers[0]['CustomerName']}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    <I18nProvider locale="en-US">
                                      <Currency value={item.GrandTotal} currency="USD" />
                                    </I18nProvider>

                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    <I18nProvider locale="en-US">
                                      <Currency value={item.ShippingCost} currency="USD" />
                                    </I18nProvider>

                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    <I18nProvider locale="en-US">
                                      <Currency value={item.VatTax} currency="USD" />
                                    </I18nProvider>

                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    <I18nProvider locale="en-US">
                                      <Currency value={item.OtherCost} currency="USD" />
                                    </I18nProvider>

                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    <I18nProvider locale="en-US">
                                      <Currency value={item.Discount} currency="USD" />
                                    </I18nProvider>

                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {moment(item.CreatedDate).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </p>
                                </td>
                                <td>
                                  <Link
                                    to={`/salesCreateUpdate?id=${item._id}`}
                                    className="btn text-info btn-outline-light p-2 mb-0 btn-sm"
                                  >
                                    <AiOutlineEdit size={15} />
                                  </Link>
                                  <button
                                    onClick={DeleteItem.bind(this, item._id)}
                                    className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"
                                  >
                                    <AiOutlineDelete size={15} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <nav aria-label="Page navigation example">
                        <ReactPaginate
                          previousLabel="<"
                          nextLabel=">"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={Math.ceil(Total / perPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </nav>
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

export default SalesList;