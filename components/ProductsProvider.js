"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "@/lib/api";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([p, c]) => {
        if (ignore) return;
        setProducts(p);
        setCategories(c);
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setError(true);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setError(false);
    setLoading(true);
    setAttempt((n) => n + 1);
  }

  return (
    <ProductsContext.Provider value={{ products, categories, loading, error, retry }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}