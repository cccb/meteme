
import { fetch } from "../../middleware/requests"

export const FETCH_PRODUCTS_REQUEST = "products/FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "products/FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "products/FETCH_PRODUCTS_ERROR";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload: {}
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: {
    products: products,
  }
});

export const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: {
    error: error,
  }
});

export const fetchProducts = () => fetch(
  "/api/v1/products",
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
);

