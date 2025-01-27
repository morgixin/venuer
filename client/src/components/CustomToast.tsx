// filepath: /c:/Users/anabs/Downloads/projeto23-PrivateRoutes-completo/projeto23-PrivateRoutes-completo/src/components/CustomToast.tsx
import React from "react";

interface CustomToastProps {
  show: boolean;
  text: string;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ show, text, onClose }) => {
  return (
    <div
      className={`toast align-items-center text-white bg-primary border-0 ${
        show ? "show" : "hide"
      }`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
    >
      <div className="d-flex">
        <div className="toast-body">{text}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default CustomToast;