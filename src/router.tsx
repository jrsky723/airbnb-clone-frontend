import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Users from "./routes/Users";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
