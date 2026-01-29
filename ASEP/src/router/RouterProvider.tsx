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
const SleepNow = React.lazy(() => import("../features/sleep-now/SleepNow"));

const SleepPicker = React.lazy(
  () => import("../features/sleep-picker/SleepPicker"),
);
const WakeUpPicker = React.lazy(
  () => import("../features/sleep-picker/WakeUpPicker"),
);

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainLayout />}>
          <Route path={RouterConstants.AboutPage} element={<About />} />
          <Route path={"test-page"} element={<TestPage />} />
          <Route path={RouterConstants.SleepNow} element={<SleepNow />} />
          <Route
            path={RouterConstants.WakeUpPicker}
            element={<WakeUpPicker />}
          />
          <Route path={RouterConstants.SleepPicker} element={<SleepPicker />} />
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
};

export default RouterProvider;
