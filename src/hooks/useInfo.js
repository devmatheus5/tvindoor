import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";

const useInfo = () => {
  const { value } = useContext(AuthContext);
  const [dollar, setDollar] = useState(0);
  const [weather, setWeather] = useState("");
  const [news, setNews] = useState([]);

  const getDollar = async () => {
    if (dollar !== 0) {
      return;
    }
    try {
      const response = await fetch(
        "https://economia.awesomeapi.com.br/all/USD-BRL"
      );
      const data = await response.json();
      if (data.USD.bid) {
        const parsedDollar = parseFloat(data.USD.bid).toFixed(2);
        setDollar(parsedDollar);
        console.log("infodol");
      }
    } catch (error) {
      setError(error);
    }
  };

  const getCity = async () => {
    if (weather !== "") {
      return;
    }
    const city = value?.user?.cidade;
    try {
      const response = await fetch(
        `https://api.hgbrasil.com/weather?key=2707deed&city_name=${city}`
      );
      if (!response.ok) {
        console.error("Erro ao buscar a localização pelo IP");
      }
      const data = await response.json();
      const results = data.results;
      setWeather(results);
      console.log("infowea");
    } catch (error) {
      setError(error);
    } finally {
    }
  };

  const getNews = async () => {
    if (news.length > 0) {
      return;
    }
    if (value?.user?.hnews == "false") {
      return;
    }
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_41711ffcddf1bb82e5ad0f2ac19aac1a5bf5b&country=br&language=pt&size=3`
      );
      if (!response.ok) {
        console.error("Erro ao buscar as notícias");
      }

      const data = await response.json();
      setNews(data.results);
      console.log("infonews");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
    getDollar();
    getCity();
  }, []);

  return { dollar, weather, news };
};

export default useInfo;
