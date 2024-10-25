import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Category from "./pages/categorys/Category";
import CreateCategory from "./pages/categorys/create-category/CreateCategory";
import UpdateCategory from "./pages/categorys/update-category/updateCategory";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Products from "./pages/products/Products";
import CreateProduct from "./pages/products/create-product/CreateProduct";
import UpdateProduct from "./pages/products/update-product/UpdateProduct";
import Register from "./pages/register/Register";
import User from "./pages/users/User";
import CreateUser from "./pages/users/create-user/createUser";
import UpdateUser from "./pages/users/update-user/updateUser";

function App() {
  return (
    <main className="flex items-start w-full max-w-[1440px] gap-10">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route path="/user" element={<User />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/update-category/:id" element={<UpdateCategory />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/update/:id" element={<UpdateUser />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
      </Routes>
    </main>
  );
}

export default App;
