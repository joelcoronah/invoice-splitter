import { useEffect, useState } from "react";

interface Cotizaciones {
  dolar: string | null;
  euro: string | null;
  fecha: string;
  timestamp: number;
}

interface ApiResponse {
  success: boolean;
  date: string;
  rates: {
    EUR: number;
    USD: number;
  };
  source: string;
  timestamp: string;
}

const obtenerCotizaciones = async (): Promise<Cotizaciones> => {
  try {
    const apiUrl = "https://bcv-api.netlify.app/api/rates";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    // Verificar que la respuesta sea exitosa y tenga los rates
    if (!data.success || !data.rates) {
      throw new Error("La API no retornó datos válidos");
    }

    // Mapear los rates: USD -> dolar, EUR -> euro
    // Convertir números a strings para mantener el formato
    return {
      dolar: data.rates.USD?.toString() || null,
      euro: data.rates.EUR?.toString() || null,
      fecha: data.timestamp || new Date().toISOString(),
      timestamp: new Date(data.timestamp || Date.now()).getTime(),
    };
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);

    // Retornar objeto con valores null en caso de error
    return {
      dolar: null,
      euro: null,
      fecha: new Date().toISOString(),
      timestamp: Date.now(),
    };
  }
};

export const useGetRateData = () => {
  const [rate, setRate] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        setError(null);

        const cotizaciones = await obtenerCotizaciones();

        if (cotizaciones.dolar || cotizaciones.euro) {
          setRate(cotizaciones);
        } else {
          setError("No se pudieron obtener las cotizaciones");
        }

        setLoading(false);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";

        setError(errorMessage);
        setLoading(false);
        console.error("Error fetching exchange rates:", err);
      }
    };

    fetchExchangeRate();

    const interval = setInterval(fetchExchangeRate, 3600000);

    return () => clearInterval(interval);
  }, []);

  return { rate, loading, error };
};

export default useGetRateData;
