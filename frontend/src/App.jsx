// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import DashLayout from './DashLayout'
import Layout from "./layout/Layout";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
// import DashboardLayout from './layout/DashboardLayout'
import Dashboard from "./features/analytics/Dashboard";
import DashLayout from "./DashLayout2";
import MiniDrawer from "./DashLayout3";
import ClippedDrawer from "./ClippedDrawer";
import ClippedMiniDrawer from "./ToggleableDrawer";
import DashboardLayout from "./layout/DashBoard2";
import PlaceOrder from "./features/orders/PlaceOrder";
import Products from "./features/products/Products";
import Categories from "./features/categories/Categories";
import NewCategory from "./features/categories/NewCategory";
import EditCategory from "./features/categories/EditCategory";
import CardDemo from "./pages/cardDemo";
import OrderDetails from "./features/orders/OrderDetails";
import NewProduct from "./features/products/NewProduct";
import EditProduct from "./features/products/EditProduct";
import Users from "./features/users/Users";
import EditUser from "./features/users/EditUser";
import ReceiptPreview from "./components/RecieptPreview";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import SessionGuard from "./features/auth/SessionGuard";
import OrderPage from "./features/orders/OrderPage";
import MissingPage from "./components/MissingPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="drawer" element={<MiniDrawer />} />
          <Route path="clipped" element={<ClippedDrawer />} />
          <Route path="toggleable" element={<ClippedMiniDrawer />} />
          <Route path="card" element={<CardDemo />} />
          <Route path="receipt" element={<ReceiptPreview />} />

          {/* Protected Routes */}
          <Route element={<SessionGuard />}>
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="order">
                    <Route index element={<OrderPage />} />
                    <Route path="new" element={<PlaceOrder />} />
                    <Route path=":id" element={<OrderDetails />} />
                  </Route>
                  <Route path="products">
                    <Route index element={<Products />} />
                    <Route path="new" element={<NewProduct />} />
                    <Route path=":id" element={<EditProduct />} />
                  </Route>
                  <Route path="categories">
                    <Route index element={<Categories />} />
                    <Route path="new" element={<NewCategory />} />
                    <Route path=":id" element={<EditCategory />} />
                  </Route>
                  <Route element={<RequireAuth allowedRoles={"admin"} />}>
                    <Route path="users">
                      <Route index element={<Users />} />
                      <Route path=":id" element={<EditUser />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          {/* Catch-All Route */}
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
