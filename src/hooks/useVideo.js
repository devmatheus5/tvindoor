import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const useVideo = () => {
  const { value } = useContext(AuthContext);
  const [videoUrls, setVideoUrls] = useState([]);
  const downloadVideos = async (fileUri) => {
    return;
    fileUri.map((item) => {
      FileSystem.downloadAsync(
        item,
        `${value.videoDirectory}/${item.split("/").pop()}`
      )
        .then(({ uri }) => {
          console.log("Finished downloading to ", uri);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  useEffect(() => {
    FileSystem.readDirectoryAsync(value.videoDirectory)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getVideos = async () => {
    await axios
      .get(`${value.baseUrl}videos/${value.user.usuario}.json`)
      .then((res) => {
        const url = res.data.map((item) => {
          let parts = item.split("videos/");
          return parts[1];
        });
        setVideoUrls(url);
      });

    const fileUri = videoUrls.map((item) => {
      return `${value.baseUrl}videos/${item}`;
    });
    downloadVideos(fileUri);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return {
    videoUrls,
  };
};

export default useVideo;
