import React from "react";
import Header from "../Header/Header";
import Router from "../../routers/Router";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/AdminNav";

const Layout = () => {
  const location = useLocation()
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header /> }
      <div>
        <Router />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
