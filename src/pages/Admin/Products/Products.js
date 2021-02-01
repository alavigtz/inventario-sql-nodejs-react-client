import React, { useState, useEffect } from "react";
import { getProductsApi } from "../../../api/product";
import ProductsList from "../../../components/Admin/Products/ProductsList/ProductsList";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);

  useEffect(() => {
    getProductsApi().then((response) => {
      setProducts(response.branches[0]);
    });
    setReloadProducts(false);
  }, [reloadProducts]);

  return (
    <ProductsList products={products} setReloadProducts={setReloadProducts} />
  );
}

