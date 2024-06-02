import Layout from "@src/components/Layout";
import Home from "@src/pages/Home.page";
import Problems from "@src/domains/go/pages/Problems.page";
import {
  createBrowserRouter,
} from "react-router-dom";
import Admin from "@src/pages/Admin.page";
  
export const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/problems",
          element: <Problems />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
      ],
    },

]);