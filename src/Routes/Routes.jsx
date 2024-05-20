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
import AddItems from "../pages/Dashboard/Dashboard/AddItems";
import AddminRoutes from "./AddminRoutes";
import MangeItems from "../pages/Dashboard/Dashboard/ManageItems/MangeItems";
import UpdateItem from "../pages/Dashboard/Dashboard/UpdateItem/UpdateItem";
import AddminHome from "../pages/Dashboard/Dashboard/AddminHome/AddminHome";
import UserHome from "../pages/Dashboard/Dashboard/UserHome/UserHome";
import Payment from "../pages/Dashboard/Dashboard/Payment/Payment";
import PaymentConfram from "../pages/Dashboard/Dashboard/PaymentConfram/PaymentConfram";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed";

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
        //   path:'/order/success/:transId',
        //   element:<PaymentSuccess></PaymentSuccess>
        // },
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
        {
          path:'paymentConfram',
          element:<PaymentConfram></PaymentConfram>
        },
        {
          path:'order/success/:email',
          element:<PaymentSuccess></PaymentSuccess>
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
          path: 'updateItem/:id',
          element: <AddminRoutes><UpdateItem></UpdateItem></AddminRoutes>,
          loader: ({params})=> fetch(`http://localhost:7000/product1/${params.id}`)
          

        },
        {
          path: 'mangeItems',
          element: <AddminRoutes><MangeItems></MangeItems></AddminRoutes>
        },
        {
          path:"users",
          element:<AddminRoutes><Allusers></Allusers></AddminRoutes>
        }
      ]
    }

    
  ]);