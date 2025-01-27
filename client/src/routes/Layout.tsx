import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";
import CustomToast from "../components/CustomToast";

const Layout = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  
  const handleShowToast = (text: string) => {
    setShowToast(true);
    setToastText(text);
    setTimeout(() => {
      setShowToast(false);
      setToastText("");
    }, 1000);
  };

  return (
    <>
      <NavBar />
      {/* <div className="container mt-3">
        <Outlet />
      </div> */}
      <div className="container mt-3">
        <Outlet context={{ handleShowToast }} />
      </div>
      <CustomToast text={toastText} show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
};
export default Layout;
