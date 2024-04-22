import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDiff } from "../utils/functions";

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
        AsyncStorage.setItem("dollarLastFetched", new Date().toISOString());
      })
      .catch((error) => {
        console.error("Erro ao buscar o valor do dólar", error);
      });
  };
  const getCity = async () => {
    const city = value?.user?.cidade;

    axios
      .get(`https://api.hgbrasil.com/weather?key=2707deed&city_name=${city}`)
      .then((response) => {
        const data = response.data;
        const results = data.results;
        setWeather(results);
        console.log("onCity", results);
        AsyncStorage.setItem("weather", JSON.stringify(results));
        AsyncStorage.setItem("weatherLastFetched", new Date().toISOString());
      })
      .catch((error) => {
        console.error("Erro ao buscar a cidade pelo IP", error);
      });
  };
  const getNews = async () => {
    await axios
      .get(
        `https://newsdata.io/api/1/news?apikey=pub_422368401d2c07156ed21e62e5c6761f9a638&country=br&language=pt&size=10`
      )
      .then((response) => {
        const data = response.data.results;
        const results = data.map((item) => {
          if (item.image_url) {
            return item;
          }
        });

        const parsedNews = JSON.stringify(results);
        AsyncStorage.setItem("news", parsedNews);
        AsyncStorage.setItem("newsLastFetched", new Date().toISOString());
        setNews(results);
        console.log("onNews", results);
      })
      .catch((error) => {
        console.error("Erro ao buscar a cidade pelo IP", error);
      });
  };
  const handleNews = async () => {
    if (value.user.news == 0) {
      console.log("news disabled");
      return;
    }
    const localNews = await AsyncStorage.getItem("news");
    const lastFetched = await AsyncStorage.getItem("newsLastFetched");
    const diff = getDiff(lastFetched);
    if (localNews) {
      if (diff >= 24) {
        getNews();
        return;
      }
      setNews(JSON.parse(localNews));
    } else {
      getNews();
    }
  };
  const handleDollar = async () => {
    const localDollar = await AsyncStorage.getItem("dollar");
    const lastFetched = await AsyncStorage.getItem("dollarLastFetched");
    const diff = getDiff(lastFetched);
    if (localDollar) {
      if (diff >= 12) {
        getDollar();
        return;
      }
      setDollar(localDollar);
    } else {
      getDollar();
    }
  };
  const handleWeather = async () => {
    const localWeather = await AsyncStorage.getItem("weather");
    const lastFetched = await AsyncStorage.getItem("weatherLastFetched");
    const diff = getDiff(lastFetched);
    if (localWeather) {
      if (diff >= 2) {
        getCity();
        return;
      }
      setWeather(JSON.parse(localWeather));
    } else {
      getCity();
    }
  };
  useEffect(() => {
    handleWeather();
    handleNews();
    handleDollar();
  }, [value?.currentMedia]);

  return { dollar, weather, news };
};

export default useInfo;
