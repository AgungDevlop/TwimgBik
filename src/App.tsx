import React from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./layout/Layout";
import { LayoutProvider } from "./context/LayoutContext";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LayoutProvider>
        <Layout>
          <Outlet />
        </Layout>
      </LayoutProvider>
    </HelmetProvider>
  );
};

export default App;