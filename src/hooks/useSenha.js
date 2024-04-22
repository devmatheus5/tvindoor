import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";

const useSenhas = () => {
  const { value } = useContext(AuthContext);
  const [senhas, setSenhas] = useState([]);

  const getSenhas = async () => {
    await axios
      .get(`${value.api}/senhas/id/${value?.user?.id}`)
      .then(async (res) => {
        if (res?.data != senhas) {
          setSenhas(res?.data);
        }
      })
      .catch((e) => {
        console.error("getSenhas", e);
      });
  };

  const postSenha = async (data) => {
    return axios
      .post(`${value.api}/senha`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error("postSenha", e);
        throw e;
      });
  };

  useEffect(() => {
    if (senhas.length == 0) {
      getSenhas();
    }
    const intervalId = setInterval(() => {
      getSenhas();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return {
    senhas,
    postSenha,
  };
};

export default useSenhas;
