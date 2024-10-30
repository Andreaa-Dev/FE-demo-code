import { useState, useEffect } from "react";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LayOut from "./components/shared/LayOut";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishListPage from "./pages/WishListPage";
import CartPage from "./pages/CartPage";
import UserRegister from "./components/user/UserRegister";
import UserLogin from "./components/user/UserLogin";

function App() {
  const [userInput, setUserInput] = useState("");
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  console.log(minPrice, maxPrice, "price");
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  });

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
        console.log(response);
        console.log(response.data);
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

  if (loading) {
    return <div> Please wait 1 second </div>;
  }

  if (error) {
    return <div> {error.message}</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut wishList={wishList} />,
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
            />
          ),
        },
        {
          path: "products/:productId",
          element: <ProductDetailPage />,
        },

        { path: "/wishList", element: <WishListPage wishList={wishList} /> },

        { path: "/cart", element: <CartPage /> },

        { path: "/register", element: <UserRegister /> },
        { path: "/login", element: <UserLogin /> },
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
