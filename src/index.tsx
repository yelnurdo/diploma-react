import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import "./assets/scss/style.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <LoginPage />
    </Layout>
  </React.StrictMode>
);
