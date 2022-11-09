import React from "react";
import { useState, useEffect, useCallback } from "react";
export default function useFetch(url) {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const resp = await fetch(url);
    const answ = await resp.json();
    setData(answ);
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [url, fetchData]);
  return { data };
}
