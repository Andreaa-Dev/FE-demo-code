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

   // step 1: update state 
   const [productResponse, setProductResponse] = useState({
     products: [],
     totalCount: 0,
   });
 
   const productUrl =
     "http://localhost:5291/api/v1/products?offset=2&limit=2&minPrice=0&maxPrice=10000";
  
  function getData() {
    axios
      .get(productUrl)
      .then((response) => {
        console.log(response)
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
  }, []);

  console.log(productResponse , "from App");


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
        { path: "/", element: <HomePage  /> },
        {
          path: "products",
          element: (
            <ProductPage
              // productList={productList}
              setUserInput={setUserInput}
              userInput={userInput}
              wishList={wishList}
              setWishList={setWishList}
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
