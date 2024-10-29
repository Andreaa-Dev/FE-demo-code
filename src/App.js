import { useState, useEffect } from "react";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LayOut from "./components/shared/LayOut";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishListPage from "./pages/WishListPage";
import CartPage from "./pages/CartPage";

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

  function getUrl(userInput, minPrice, maxPrice) {
    let productUrl = `http://localhost:5291/api/v1/products?offset=${offset}&limit=${limit}&search=${userInput}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    // if (userInput) {
    //   productUrl += `&search=${userInput}`;
    // }
    console.log(productUrl, "p");
    return productUrl;
  }

  function getData() {
    axios
      .get(getUrl(userInput, minPrice, maxPrice))
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
