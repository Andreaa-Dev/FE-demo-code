import { useState, useEffect } from "react";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import LayOut from "./components/shared/LayOut";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishListPage from "./pages/WishListPage";
import CartPage from "./pages/CartPage";
import UserRegister from "./components/user/UserRegister";
import UserLogin from "./components/user/UserLogin";
import UserProfile from "./components/user/UserProfile";
import ProtectedRoute from "./components/user/ProtectedRoute";
import DashBoard from "./components/dashBoard/DashBoard";
import ProductDashBoard from "./components/dashBoard/ProductDashBoard";
import AboutPage from "./pages/AboutPage";
import Example from "./Example";

function App() {
  const [userInput, setUserInput] = useState("");
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  });
  const [cartList, setCartList] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  let limit = 3;
  let offset = (page - 1) * limit;

  // way 1
  let productUrl = `http://localhost:5291/api/v1/products?offset=${offset}&limit=${limit}&search=${userInput}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  // way 2
  // url: limit + offset => 2times
  // search => limit + offset + search => 3 times
  // function getUrl(userInput, minPrice, maxPrice) {
  //   let productUrl = `http://localhost:5291/api/v1/products?offset=${offset}&limit=${limit}`;

  //   if (userInput) {
  //     productUrl += `&search=${userInput}`;
  //   }
  //   if (minPrice) {
  //     productUrl += `&minPrice=${minPrice}`;
  //   }
  //   if (maxPrice) {
  //     productUrl += `&maxPrice=${maxPrice}`;
  //   }
  //   console.log(productUrl, "p");
  //   return productUrl;
  // }

  function getData() {
    axios
      .get(productUrl)
      .then((response) => {
        setProductResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  useEffect(() => {
    getData();
  }, [offset, limit, userInput, minPrice, maxPrice]);

  // user
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5291/api/v1/users/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // null => res.data
        setUserData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  // protected route
  let isAuthenticated = userData ? true : false;

  if (loading) {
    return <div> Please wait 1 second </div>;
  }

  if (error) {
    return <div> {error.message}</div>;
  }

  // admin
  // let shouldCheckAdmin = true;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayOut
          wishList={wishList}
          isAuthenticated={isAuthenticated}
          userData={userData}
        />
      ),
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "products",
          element: (
            <ProductPage
              productList={productResponse.products}
              setUserInput={setUserInput}
              userInput={userInput}
              wishList={wishList}
              setWishList={setWishList}
              totalCount={productResponse.totalCount}
              page={page}
              handleChange={handleChange}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              cartList={cartList}
              setCartList={setCartList}
            />
          ),
        },
        {
          path: "products/:productId",
          element: <ProductDetailPage />,
        },
        { path: "/wishList", element: <WishListPage wishList={wishList} /> },
        {
          path: "/cart",
          element: (
            <CartPage
              cartList={cartList}
              setCartList={setCartList}
              userData={userData}
            />
          ),
        },

        {
          path: "about",
          element: <AboutPage />,
          children: [{ path: "example", element: <Example /> }],
        },
        // about/example

        { path: "/register", element: <UserRegister /> },
        { path: "/login", element: <UserLogin getUserData={getUserData} /> },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              element={
                <UserProfile userData={userData} setUserData={setUserData} />
              }
            />
          ),
          // element: <UserProfile />,
        },

        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              // shouldCheckAdmin={shouldCheckAdmin}
              shouldCheckAdmin={true}
              userData={userData}
              element={<DashBoard />}
            />
          ),
        },

        {
          path: "/product-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              // shouldCheckAdmin={shouldCheckAdmin}
              shouldCheckAdmin={true}
              userData={userData}
              element={
                <ProductDashBoard
                // productList={productResponse.products}
                // loading={loading}
                />
              }
            />
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
