import React from "react";
import useFetch from "../hooks/useFetch";

export default function PurchaseOrders() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/purchase-orders`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data.message}</p>;
}
