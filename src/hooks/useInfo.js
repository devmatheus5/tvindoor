import { useState, useEffect } from "react";

const useInfo = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [dollar, setDollar] = useState("0.00");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false); // Novo estado para controle

  const getDollar = async () => {
    try {
      if (!isDataFetched) {
        // Verifica se os dados já foram buscados antes
        const response = await fetch(
          "https://economia.awesomeapi.com.br/all/USD-BRL"
        );
        const data = await response.json();
        if (data.USD.bid) {
          const parsedDollar = parseFloat(data.USD.bid).toFixed(2);
          setDollar(parsedDollar);
          setIsDataFetched(true); // Define como true após buscar os dados
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  const getCity = async () => {
    try {
      if (!isDataFetched) {
        // Verifica se os dados já foram buscados antes

        const response = await fetch(
          `https://api.hgbrasil.com/weather?key=2707deed&city_name=petrolina`
        );
        if (!response.ok) {
          console.error("Erro ao buscar a localização pelo IP");
        }
        const data = await response.json();
        const results = data.results;
        console.log(results);
        setCity(data?.city);
        setWeather(results);
        setIsDataFetched(true); // Define como true após buscar os dados
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getNews = async () => {
    try {
      if (!isDataFetched) {
        // Verifica se os dados já foram buscados antes
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_41711ffcddf1bb82e5ad0f2ac19aac1a5bf5b&country=br&language=pt&size=3`
        );
        if (!response.ok) {
          console.error("Erro ao buscar as notícias");
        }

        const data = await response.json();
        setNews(data.results);
        console.log(data.results);
        setIsDataFetched(true); // Define como true após buscar os dados
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDollar();
    getCity();
    getNews();
  }, []);

  return { dollar, weather, loading, error, news };
};

export default useInfo;
