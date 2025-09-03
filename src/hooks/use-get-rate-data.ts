import { useEffect, useState } from "react";

interface Cotizaciones {
  dolar: string | null;
  euro: string | null;
  fecha: string;
  timestamp: number;
}

const obtenerCotizaciones = async (): Promise<Cotizaciones> => {
  try {
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = "https://www.bcv.org.ve/";

    const response = await fetch(
      `${proxyUrl}${encodeURIComponent(targetUrl)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Función auxiliar para buscar cotizaciones
    const buscarCotizacion = (moneda: string): string | null => {
      const selectores = [
        `#${moneda} strong`,
        `#${moneda} .centrado`,
        `.${moneda} strong`,
        `[id*="${moneda}"] strong`,
        `.cotizacion.${moneda} strong`,
        `.${moneda} .cotizacion strong`,
      ];

      for (const selector of selectores) {
        const elemento = doc.querySelector(selector);

        if (elemento && elemento.textContent?.trim()) {
          return elemento.textContent.trim();
        }
      }

      // Buscar con regex como fallback
      const regex = new RegExp(
        `${moneda.toUpperCase()}\\s*[^\\d]*([\\d,]+)`,
        "i",
      );
      const match = html.match(regex);

      return match ? match[1] : null;
    };

    // Obtener ambas cotizaciones
    const dolar = buscarCotizacion("dolar");
    const euro = buscarCotizacion("euro");

    return {
      dolar,
      euro,
      fecha: new Date().toISOString(),
      timestamp: Date.now(),
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
