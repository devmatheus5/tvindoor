import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const useVideo = () => {
  const { value } = useContext(AuthContext);
  const [videoUrls, setVideoUrls] = useState([]);
  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getVideos = async () => {
    const url = "https://dev.rutherles.pt/videos/vi1.mp4";
    const fileUri = FileSystem.documentDirectory + "videos/" + "video.mp4";

    FileSystem.downloadAsync(url, fileUri)
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {}, []);

  return {
    videoUrls,
  };
};

export default useVideo;
