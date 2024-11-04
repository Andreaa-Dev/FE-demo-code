import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import { Box, Button, Popover, TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Description } from "@mui/icons-material";

export default function ProductDashBoard() {
  // way 1: pass prop from App
  // way 2: fetch product list with no pagination
  // endpoint in BE: http://localhost:5291/api/v1/products

  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchData() {
    let url =
      "http://localhost:5291/api/v1/products?offset=0&limit=100&search=&minPrice0&maxPrice=10000";

    axios
      .get(url)
      .then((response) => {
        setProductResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(productResponse.products);

  // popover - MUI
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // fetch category

  const [categoryList, setCategoryList] = useState([]);

  function fetchCategory() {
    let url = "http://localhost:5291/api/v1/category";

    axios
      .get(url)
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchCategory();
  }, []);
  console.log(categoryList);

  // get information from form
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
    categoryId: "",
  });
  function onChangeHandler(event) {
    console.log(event, "event");
    setProductInfo({
      ...productInfo,
      // [event.target.id]: event.target.value,
      [event.target.name]: event.target.value,
    });
  }

  console.log(productInfo, "infor");
  return (
    <div>
      <h1> ProductDashBoard </h1>
      <p> see list of products - delete product - edit - update</p>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Create new product
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TextField
          name="name"
          label="Name"
          variant="standard"
          helperText="please enter the product name"
          onChange={onChangeHandler}
        />
        <br />
        <TextField
          name="price"
          label="Price"
          variant="standard"
          helperText="please enter the product name"
          onChange={onChangeHandler}
        />
        <br />
        <TextField
          name="imageUrl"
          label="Image link"
          variant="standard"
          helperText="please enter the product name"
          onChange={onChangeHandler}
        />
        <br />
        <TextField
          name="description"
          label="Description"
          variant="standard"
          helperText="please enter the product name"
          onChange={onChangeHandler}
        />
        <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category id</InputLabel>
          <Select
            labelId="categoryId"
            name="categoryId"
            value={productInfo.categoryId}
            label="Category Id"
            onChange={onChangeHandler}
          >
            {categoryList.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Popover>

      <h1> List of products</h1>
      <div>
        {productResponse.products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              fetchData={fetchData}
            />
          );
        })}
      </div>
    </div>
  );
}
