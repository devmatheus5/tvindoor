import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useInfo = () => {
  const { value } = useContext(AuthContext);
  const [dollar, setDollar] = useState(0);
  const [weather, setWeather] = useState("");
  const [news, setNews] = useState([]);

  const getDollar = async () => {
    await axios
      .get("https://economia.awesomeapi.com.br/all/USD-BRL")
      .then((response) => {
        const data = response.data;
        const parsedDollar = parseFloat(data.USD.bid).toFixed(2);
        setDollar(parsedDollar);
        console.log("onDollar", parsedDollar.toString());
        AsyncStorage.setItem("dollar", parsedDollar.toString());
      })
      .catch((error) => {
        console.error("Erro ao buscar o valor do dólar", error);
      });
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
          console.log("onCity", results);
          AsyncStorage.setItem("weather", JSON.stringify(results));
        })
        .catch((error) => {
          console.error("Erro ao buscar a cidade pelo IP", error);
        });
    }
  };
  const getNews = async () => {
    await axios
      .get(
        `https://newsdata.io/api/1/news?apikey=pub_422368401d2c07156ed21e62e5c6761f9a638&country=br&language=pt&size=10`
      )
      .then((response) => {
        const data = response.data;
        const results = data.results;
        const parsedNews = JSON.stringify(results);
        AsyncStorage.setItem("news", parsedNews);
        setNews(results);
        console.log("onNews", results);
      })
      .catch((error) => {
        console.error("Erro ao buscar a cidade pelo IP", error);
      });
  };
  const handleNews = async () => {
    const localNews = await AsyncStorage.getItem("news");
    if (localNews) {
      setNews(JSON.parse(localNews));
    } else {
      getNews();
    }
  };
  const handleDollar = async () => {
    const localDollar = await AsyncStorage.getItem("dollar");
    if (localDollar) {
      setDollar(localDollar);
    } else {
      getDollar();
    }
  };
  const handleWeather = async () => {
    const localWeather = await AsyncStorage.getItem("weather");
    if (localWeather) {
      setWeather(JSON.parse(localWeather));
    } else {
      getCity();
    }
  };
  useEffect(() => {
    handleWeather();

    handleNews();

    handleDollar();
  }, []);

  return { dollar, weather, news };
};

export default useInfo;
