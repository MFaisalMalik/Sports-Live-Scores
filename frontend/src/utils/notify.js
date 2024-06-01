import { toast } from "react-toastify";

export const notify = (message, type) => {
  toast[type](message, {
    position: "top-right",
    color: "red",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
