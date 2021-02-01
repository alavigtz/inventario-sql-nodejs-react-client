import AdminLayout from "../layouts/AdminLayout";
import PublicLayout from "../layouts/PublicLayout";

//Admin Pages
import AdminHome from "../pages/Admin/AdminHome";
import AdminInventory from "../pages/Admin/Inventory/Inventory";
import AdminBranches from "../pages/Admin/Branches/Branches";
import AdminProducts from "../pages/Admin/Products/Products";

//Public Pages
import Home from "../pages/Public/Home";

//Other
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin",
    component: AdminLayout,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/inventory",
        component: AdminInventory,
        exact: true,
      },
      {
        path: "/admin/branches",
        component: AdminBranches,
        exact: true,
      },
      {
        path: "/admin/products",
        component: AdminProducts,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: PublicLayout,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
