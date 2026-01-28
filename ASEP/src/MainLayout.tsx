import { Outlet, useNavigate } from "react-router-dom";
import { RouterConstants } from "./router/RoutesConstants";

const MainLayout = () => {
  const navigate = useNavigate();
  //   navigate(RouterConstants.AboutPage);
  navigate("/test-page");

  return (
    <>
      <div style={{ color: "red" }}>hello</div>
      <Outlet></Outlet>
    </>
  );
};
export default MainLayout;
