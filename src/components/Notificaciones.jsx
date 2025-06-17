import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  return <ToastContainer position="bottom-right" autoClose={3000} />;
};

export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyError = (message) => {
  toast.error(message);
};

export default Notifications;