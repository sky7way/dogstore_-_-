import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const errorAlert = (title) => {
  confirmAlert({
    title: "Внимание!",
    message: title,
    buttons: [
      {
        label: "Ок",
      },
    ],
  });
};
