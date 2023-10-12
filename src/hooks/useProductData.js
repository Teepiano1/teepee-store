import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../basurl";

const useProductData = (url) => {
  // states to keep your data
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        setData(data);
      }
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading
  };
};

export default useProductData;
