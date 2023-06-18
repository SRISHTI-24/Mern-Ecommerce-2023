import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />

      <main style={{ minHeight: "70vh" }}>
        <ToastContainer />

        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
