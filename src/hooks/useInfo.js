import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";

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
      }
    } catch (error) {
      setError(error);
    }
  };

  const getCity = async () => {
    const city = value?.user?.cidade;

    if (!weather && city) {
      axios
        .get(`https://api.hgbrasil.com/weather?key=2707deed&city_name=${city}`)
        .then((response) => {
          const data = response.data;

          const results = data.results;
          setWeather(results);
        })
        .catch((error) => {
          console.error("Erro ao buscar a cidade pelo IP", error);
        });
    }
  };

  const getNews = async () => {
    if (value?.user?.hnews == "true") {
      return;
    }
    try {
      if (news.length < 2) {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_422368401d2c07156ed21e62e5c6761f9a638&country=br&language=pt&size=3`
        );

        const data = await response.json();
        setNews(data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCity();
    getNews();
    getDollar();
  }, []);

  return { dollar, weather, news };
};

export default useInfo;
