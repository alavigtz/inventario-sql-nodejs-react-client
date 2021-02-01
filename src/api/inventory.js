import { basePath, apiVersion } from "./config";

export function getInventoryApi(inventoryId) {
  const url = `${basePath}/${apiVersion}/get-inventory/${inventoryId}`;

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

export function addInventoryApi(inventoryData) {
  const url = `${basePath}/${apiVersion}/add-inventory`;
  const params = {
    method: "POST",
    body: JSON.stringify(inventoryData),
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

export function updateInventoryApi(inventoryId, inventoryData) {
  const url = `${basePath}/${apiVersion}/update-inventory/${inventoryId}`;
  const params = {
    method: "PUT",
    body: JSON.stringify(inventoryData),
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

