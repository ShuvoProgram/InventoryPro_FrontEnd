import React, { useRef } from "react";
import { Accordion, Container, Navbar } from "react-bootstrap";
import {
  AiOutlineBank,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineMenuUnfold
} from "react-icons/ai";
import {
  RiDashboardLine
} from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import {
  BsBagPlus,
  BsBagX,
  BsBox,
  BsCartPlus,
  BsCircle,
  BsGraphUp,
  BsPeople,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import { getUserDetails, removeSession } from "../../helper/SessionHelper";

const MasterLayout = (props) => {
  let contentRef,
    sideNavRef,
    topNavRef = useRef();
  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    let topNav = topNavRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
      topNav.classList.remove("top-nav-open");
      topNav.classList.add("top-nav-close");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
      topNav.classList.add("top-nav-open");
      topNav.classList.remove("top-nav-close");
    }
  };

  const isSidebarAccordionActive = () => {
    let urlList = [];
    sidebarItems.map((item) => {
      urlList.push(
        item.subMenu.map((subItem) => {
          return subItem?.url;
        })
      );
    });
    return urlList.findIndex((items) =>
      items.includes(window.location.pathname)
    );
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <RiDashboardLine className="side-bar-item-icon" />,
      url: "/",
      subMenu: [],
    },
    {
      title: "Customer",
      icon: <BsPeople className="side-bar-item-icon" />,
      url: "/customer",
      subMenu: [
        {
          title: "New Customer",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/customerCreateUpdate",
        },
        {
          title: "Customer List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/customerList",
        },
      ],
    },
    {
      title: "Supplier",
      icon: <TbTruckDelivery className="side-bar-item-icon" />,
      url: "/Supplier",
      subMenu: [
        {
          title: "New Supplier",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/supplierCreateUpdate",
        },
        {
          title: "Supplier List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/supplierList",
        },
      ],
    },
    {
      title: "Expense",
      icon: <AiOutlineBank className="side-bar-item-icon" />,
      url: "/Expense",
      subMenu: [
        {
          title: "New Expense Type",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/expenseTypeCreateUpdate",
        },
        {
          title: "Expense Type List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/expenseTypeList",
        },
        {
          title: "New Expense",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/expenseCreateUpdate",
        },
        {
          title: "Expense List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/expenseList",
        },
      ],
    },
    {
      title: "Product",
      icon: <BsBox className="side-bar-item-icon" />,
      url: "/Product",
      subMenu: [
        {
          title: "New Brand",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/brandCreateUpdate",
        },
        {
          title: "Brand List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/brandList",
        },
        {
          title: "New Category",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/categoryCreateUpdate",
        },
        {
          title: "Category List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/categoryList",
        },
        {
          title: "New Product",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/productCreateUpdate",
        },
        {
          title: "Product List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/productList",
        },
      ],
    },
    {
      title: "Purchase",
      icon: <BsBagPlus className="side-bar-item-icon" />,
      url: "/Purchase",
      subMenu: [
        {
          title: "New Purchase",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/purchaseCreateUpdate",
        },
        {
          title: "Purchase List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/purchaseList",
        },
      ],
    },
    {
      title: "Sale",
      icon: <BsCartPlus className="side-bar-item-icon" />,
      url: "/Sale",
      subMenu: [
        {
          title: "New Sale",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/salesCreateUpdate",
        },
        {
          title: "Sale List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/salesList",
        },
      ],
    },
    {
      title: "Return",
      icon: <BsBagX className="side-bar-item-icon" />,
      url: "/Return",
      subMenu: [
        {
          title: "New Return",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/returnCreateUpdate",
        },
        {
          title: "Return List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/returnList",
        },
      ],
    },
    {
      title: "Report",
      icon: <BsGraphUp className="side-bar-item-icon" />,
      url: "/Report",
      subMenu: [
        {
          title: "Sale Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/saleReport",
        },
        {
          title: "Return Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/returnReport",
        },
        {
          title: "Purchase Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/purchaseReport",
        },
        {
          title: "Expense Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/expenseReport",
        },
      ],
    },
  ];

  const onLogout = () => {
    removeSession();
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar className="fixed-top px-0 ">
        <Container fluid={true}> 
          <Navbar.Brand>
            <div
              ref={(div) => {
                topNavRef = div;
              }}
              className="top-nav-open"
            >
              <h4 className="text-white m-0 p-0">
                <a onClick={MenuBarClickHandler}>
                  <AiOutlineMenuUnfold />
                  {/* <AiOutlineMenu /> */}
                </a>
              </h4>
            </div>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex align-items-center">
            <div className="user-dropdown">
              <img
                className="icon-nav-img icon-nav"
                src={getUserDetails()["photo"]}
                alt="logo"
              />
              <div className="user-dropdown-content ">
                <div className="mt-4 text-center">
                  <img
                    className="icon-nav-img"
                    src={getUserDetails()["photo"]}
                    alt=""
                  />
                  <h6>{getUserDetails()["firstName"]}</h6>
                  <hr className="user-dropdown-divider  p-0" />
                </div>
                <NavLink to="/profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <a onClick={onLogout} className="side-bar-item">
                  <AiOutlineLogout className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open border-radius-0 card"
      >
        <NavLink
          to="/"
          end
          className="d-flex justify-content-center sticky-top bg-white"
        >
          <img src={logo} className="logo" />
        </NavLink>

        <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
          {sidebarItems?.map((item, index) => {
            return item.subMenu.length !== 0 ? (
              <Accordion.Item
                key={index.toString()}
                eventKey={`${index}`}
                className="mt-2"
              >
                <Accordion.Header>
                  <div className="side-bar-item">
                    {item.icon}
                    <span className="side-bar-item-caption">{item.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.subMenu.map((subItem, index) => (
                    <NavLink
                      key={index.toString()}
                      className={(navData) =>
                        navData.isActive
                          ? "side-bar-subitem-active side-bar-subitem "
                          : "side-bar-subitem"
                      }
                      to={subItem?.url}
                      end
                    >
                      {subItem?.icon}
                      <span className="side-bar-subitem-caption">
                        {subItem?.title}
                      </span>
                    </NavLink>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              <NavLink
                key={index.toString()}
                className={(navData) =>
                  navData.isActive
                    ? "side-bar-item-active side-bar-item mt-2"
                    : "side-bar-item mt-2"
                }
                to={"/"}
                end
              >
                {item.icon}
                <span className="side-bar-item-caption">{item.title}</span>
              </NavLink>
            );
          })} 
        </Accordion>
      </div>

      <div ref={(div) => (contentRef = div)} className="content">
        {props.children}
      </div>
    </>
  );
};

export default MasterLayout;
