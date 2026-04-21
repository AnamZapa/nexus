import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Services from "../layouts/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "services", element: <Services /> }
    ],
  },
]);