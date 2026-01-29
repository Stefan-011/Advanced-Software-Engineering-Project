/* eslint-disable @typescript-eslint/no-unused-vars */
// src/router/RouterProvider.tsx
import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouterConstants } from "./RoutesConstants";
import MainLayout from "../MainLayout";
import TestPage from "../features/test-page/TestPage";

// import Home from "../pages/Home";
// import About from "../pages/About";
// import NotFound from "../pages/NotFound";

interface RouterProviderProps {
  children?: ReactNode; // optional, in case you want to wrap other components
}

const About = React.lazy(
  () => import("../features/about-page/component/AboutPage"),
);

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainLayout />}>
          <Route path={RouterConstants.AboutPage} element={<About />} />
          <Route path={"test-page"} element={<TestPage />} />
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
};

export default RouterProvider;
