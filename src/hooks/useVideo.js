import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";
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

  const getVideos = async () => {
    const videos = await FileSystem.readDirectoryAsync(value.videoDirectory);
    await axios
      .get(`${value.baseUrl}videos/${value.user.usuario}.json`)
      .then((res) => {
        const url = res.data.map((item) => {
          let parts = item.split("videos/");
          return parts[1];
        });
        const fileUri = url
          .filter((item) => !videos.includes(item))
          .map((item) => `${value.baseUrl}${item}`);

        console.log(fileUri);
        downloadVideos(fileUri);

        const videoUri = url.map((item) => {
          return `${value.videoDirectory}/${item}`;
        });
        setVideoUrls(videoUri);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  return {
    videoUrls,
  };
};

export default useVideo;
