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
    const fileUri = videos
      .filter((item) => !url.includes(item))
      .map((item) => `${value.videoDirectory}/${item}`);
    if (fileUri.length === 0) {
      return;
    }
    try {
      fileUri.map((item) => {
        FileSystem.deleteAsync(item)
          .then((res) => {
            console.log("Finished deleted to ", res);
          })
          .catch((error) => {
            console.error("delete", error);
          });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const downloadVideos = async (url, videos) => {
    const fileUri = url
      .filter((item) => !videos.includes(item))
      .map((item) => `${value.baseUrl}${item}`);

    try {
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
      const data = await getLoaded();
      const videoUri = data?.map((item) => {
        return `${value.videoDirectory}/${item}`;
      });
      setVideoUrls(videoUri);
      setIsLoading(false);
    } catch (e) {
      console.error(" download", e);
    }
  };

  const getVideos = async () => {
    setIsError(false);
    setIsLoading(true);
    const videos = await getLoaded();
    await axios
      .get(`${value.baseUrl}videos/${value.user.usuario}.json`)
      .then(async (res) => {
        const url = res.data.map((item) => {
          let parts = item.split("videos/");
          return parts[1];
        });

        await deleteVideos(url, videos);
        await downloadVideos(url, videos);
      })
      .catch((e) => {
        console.error("getVideos", e);
        setIsError(true);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  return {
    videoUrls,
    isLoading,
    isError,
    getVideos,
  };
};

export default useVideo;
