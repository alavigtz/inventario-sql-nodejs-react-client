import { basePath, apiVersion } from "./config";

export function getProductsApi() {
  const url = `${basePath}/${apiVersion}/get-products`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function addProductApi(productData) {
  const url = `${basePath}/${apiVersion}/add-product`;
  const params = {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function updateProductApi(ProductId, productData) {
  const url = `${basePath}/${apiVersion}/update-product/${ProductId}`;
  const params = {
    method: "PUT",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteProductApi(productId) {
  const url = `${basePath}/${apiVersion}/delete-product/${productId}`;
  const params = {
    method: "DELETE",
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
