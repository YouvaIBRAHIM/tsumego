import Layout from "@src/components/Layout";
import Home from "@src/pages/Home.page";
import {
  createBrowserRouter,
} from "react-router-dom";
  
export const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/history",
          element: <div>History</div>,
        },
      ],
    },

]);