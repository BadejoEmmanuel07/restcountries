//MPS
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import FetchData from "./views/FetchData";
import NavLinks from "./views/NavLinks";
import CountryName from "./views/CountryName";
import Currency from "./views/Currency";
import Navs from "./Dashboard/Navs";
import User from "./Dashboard/User";
import Header from "./Dashboard/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavLinks />,
    children: [
      {
        index: true,
        element: <FetchData />
      },
      {
        path: "/CountryName",
        element: <CountryName />
      },
      {
        path: "/currency",
        element: <Currency />
      },
      {
        path: "*",
        element: <h1>PAGE NOT FOUND PLEASE RELOAD </h1>
      }
    ]

  },
  {
    path: "/dashboard",
    element: <Navs />,
    children: [
      {
        path: "/dashboard/users",
        element:<User/>
      },
      {
        path: "/dashboard/header",
      element:<Header/>
    }
    ]
  }

 

])
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;