import { basePath, apiVersion } from "./config";

export function getBranchesApi() {
  const url = `${basePath}/${apiVersion}/get-branches`;

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

export function getBranchesIdApi() {
  const url = `${basePath}/${apiVersion}/get-branchesId`;

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

export function addBranchApi(branchData) {
  const url = `${basePath}/${apiVersion}/add-branch`;
  const params = {
    method: "POST",
    body: JSON.stringify(branchData),
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

export function updateBranchApi(branchId, branchData) {
  const url = `${basePath}/${apiVersion}/update-branch/${branchId}`;
  const params = {
    method: "PUT",
    body: JSON.stringify(branchData),
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

export function deleteBranchApi(branchId) {
  const url = `${basePath}/${apiVersion}/delete-branch/${branchId}`;
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
