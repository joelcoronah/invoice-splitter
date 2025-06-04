import axios from "axios";
import { useEffect, useState } from "react";

export const useGetRateData = () => {
  const [rate, setRate] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://pydolarve.org/api/v2/tipo-cambio",
        );

        const rate = response.data;

        setRate(rate);
        setLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
        console.error("Error fetching exchange rate:", err);
      }
    };

    fetchExchangeRate();

    const interval = setInterval(fetchExchangeRate, 3600000);

    return () => clearInterval(interval);
  }, []);

  return { rate, loading, error };
};

export default useGetRateData;
