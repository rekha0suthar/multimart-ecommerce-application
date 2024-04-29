import React from "react";
import { Container, NavLink, Row } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";

const admin_nav = [
  {
    dispaly: "Dashboard",
    path: "/dashboard",
  },
  {
    dispaly: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    dispaly: "Orders",
    path: "/dashboard/orders",
  },
  {
    dispaly: "Users",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <header className="admin_header">
        <div className="admin_nav_top">
          <Container>
            <div className="admin_nav_wrapper_top">
              <div className="logo">
                <h2>Multimart</h2>
              </div>
              <div className="search_box">
                <input type="text" placeholder="Search....." />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
              <div className="admin_nav_top_right">
                <span>
                  <i class="ri-notification-line"></i>
                </span>
                <span>
                  <i class="ri-settings-2-line"></i>
                </span>
                <img src={currentUser && currentUser.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin_menu p-0">
        <Container>
          <Row>
            <div className="admin_navigation">
              <ul className="admin_menu_list">
                {admin_nav.map((item, index) => (
                  <li className="admin_menu_item" key={index}>
                    <NavLink to={item.path} className={isActive=> isActive ? "active_admin_menu" : ""}>{item.dispaly}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
