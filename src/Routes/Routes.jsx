import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";

import OrderReview from "../pages/OrderReview/OrderReview";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Dashboard/Cart/Cart";
import Allusers from "../pages/Dashboard/Dashboard/AllUsers/Allusers";
import AddItems from "../pages/Dashboard/Dashboard/AddItems";
import AddminRoutes from "./AddminRoutes";
import MangeItems from "../pages/Dashboard/Dashboard/ManageItems/MangeItems";
import UpdateItem from "../pages/Dashboard/Dashboard/UpdateItem/UpdateItem";
import AddminHome from "../pages/Dashboard/Dashboard/AddminHome/AddminHome";
import UserHome from "../pages/Dashboard/Dashboard/UserHome/UserHome";
import Payment from "../pages/Dashboard/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed";
import PublicRoute from "./PublicRoute";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../Shared/ContactUs";
import AddReview from "../pages/Dashboard/Dashboard/AddReview/AddReview";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path: "/",
          element: <PublicRoute><Home></Home></PublicRoute>
        },
        {
          path: "/booking",
          element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
        },
        {
          path: "/about",
          element: <AboutUs></AboutUs>
        },
        {
          path: "/contact",
          element: <ContactUs></ContactUs>
        },
        {
          path:'/order/failed/:transId',
          element:<PaymentFailed></PaymentFailed>
        },
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
      path: "/dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        //user Routes
        {
          path:'userHome',
          element:<UserHome></UserHome>

        },
        {
          path:"cart",
          element:<Cart></Cart>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },
        // {
        //   path:'paymentConfram',
        //   element:<PaymentConfram></PaymentConfram>
        // },
        {
          path:'order/success/:email',
          element:<PaymentSuccess></PaymentSuccess>
        },
        {
            path:'review',
            element:<AddReview></AddReview>
        },

        // admin routes
        {
            path:'addminHome',
            element:<AddminRoutes><AddminHome></AddminHome></AddminRoutes>
        },

        {
        path:"addItems",
        element: <AddminRoutes><AddItems></AddItems></AddminRoutes>
        },
       
        {
          path: 'mangeItems',
          element: <AddminRoutes><MangeItems></MangeItems></AddminRoutes>
        },
        {
          path: 'updateItem/:id',
          element: <AddminRoutes><UpdateItem></UpdateItem></AddminRoutes>,
          loader: ({params})=> fetch(`https://diu-project-server.vercel.app/product1/${params.id}`)
          

        },
        {
          path:"users",
          element:<AddminRoutes><Allusers></Allusers></AddminRoutes>
        }
      ]
    }

    
  ]);