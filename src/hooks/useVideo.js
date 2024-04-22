import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const useVideo = () => {
  const { value } = useContext(AuthContext);
  const [videoUrls, setVideoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getLoaded = () => {
    return FileSystem.readDirectoryAsync(value.videoDirectory);
  };
  const deleteVideos = async (url, videos) => {
    const data = url.map((item) => item.title);
    const fileUri = videos
      .filter((item) => !data.includes(item))
      .map((item) => `${value.videoDirectory}/${item}`);

    if (fileUri.length === 0) {
      return;
    }
    await Promise.all(fileUri.map((item) => FileSystem.deleteAsync(item))).then(
      () => {
        console.log("Deleted", fileUri.length, "videos");
      }
    );
  };

  const downloadVideos = async (url, videos) => {
    const fileUri = url
      .filter((item) => !videos.includes(item.title))
      .map((item) => `${value.baseUrl}${item.video}`);
    if (fileUri.length > 0) {
      await Promise.all(
        fileUri.map((item) =>
          FileSystem.downloadAsync(
            item,
            `${value.videoDirectory}/${item.split("/").pop()}`
          )
        )
      ).then(() => {
        console.log("Downloaded", fileUri.length, "videos");
      });
    }
    const data = await getLoaded();
    const videoUri = data?.map((item) => {
      return `${value.videoDirectory}/${item}`;
    });
    if (videoUri.length > 0) {
      setVideoUrls(videoUri);
      setIsLoading(false);
    }
  };

  const getVideos = async () => {
    setIsError(false);
    const videos = await getLoaded();
    await axios
      .get(`${value.api}/videos`)
      .then(async (res) => {
        const url = res.data.data;
        await deleteVideos(url, videos);
        await downloadVideos(url, videos);
      })
      .catch((e) => {
        console.error("getVideos", e);
        setIsError(true);
      });
  };
  useEffect(() => {
    const interval = value.intervalo;
    if (videoUrls.length === 0) {
      getVideos();
    }

    const intervalId = setInterval(() => {
      getVideos();
    }, interval * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    videoUrls,
    isLoading,
    isError,
    getVideos,
  };
};

export default useVideo;
