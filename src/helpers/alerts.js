import Swal from "sweetalert2";

export const successAlert = (msg) =>
  Swal.fire("Éxito", msg, "success");

export const errorAlert = (msg) =>
  Swal.fire("Error", msg, "error");