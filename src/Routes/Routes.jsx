import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Order from "../pages/Order/Order";
import OrderReview from "../pages/OrderReview/OrderReview";
import PrivateRoute from "./PrivateRoute";
import Main2 from "../pages/main2/Main2";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Dashboard/Cart/Cart";
import Allusers from "../pages/Dashboard/Dashboard/AllUsers/Allusers";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path: "/",
          element: <Main2></Main2>
        },
        {
          path: "/shop",
          element: <Home></Home>
        },
        // {
        //   path:"/shop",
        //   element:<PrivateRoute><Order></Order></PrivateRoute>
        // },
        {
          path:"/review",
          element: <PrivateRoute><OrderReview></OrderReview></PrivateRoute>

        },

        {
            path:"/login",
            element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>,
        }

      ]
    },
    {
      path: "dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:"cart",
          element:<Cart></Cart>
        },

        // admin routes
        {
          path:"users",
          element:<Allusers></Allusers>
        }
      ]
    }

    
  ]);