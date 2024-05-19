import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@redux/store";
import Layout from "@components/Layout";
import LoginPage from "@pages/LoginPage";
import "@assets/scss/style.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <LoginPage />
      </Layout>
    </Provider>
  </React.StrictMode>
);
