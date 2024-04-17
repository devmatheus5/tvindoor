export function handleType(type) {
  switch (type) {
    case "garcom":
      return "#28a745"; // Verde para garçom
    case "balcao":
      return "#1c1c1a"; // Preto para balcão
    case "encerrar":
      return "red"; // Vermelho para encerrar
    default:
      return "#161616"; // Cor padrão caso o tipo não seja reconhecido
  }
}

export const playNextVideo = async (
  currentVideoIndex,
  videoUrls,
  setCurrentVideoIndex,
  video
) => {
  if (currentVideoIndex < videoUrls.length - 1) {
    await video.current?.unloadAsync();
    setCurrentVideoIndex(currentVideoIndex + 1);
    await video.current?.loadAsync(
      { uri: videoUrls[currentVideoIndex] },
      {},
      false
    );
    await video.current?.playAsync();
  } else {
    await video.current?.unloadAsync();
    setCurrentVideoIndex(0);
    await video.current?.loadAsync(
      { uri: videoUrls[currentVideoIndex] },
      {},
      false
    );
    await video.current?.playAsync();
  }
};

export const formattedDate = () => {
  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${dayOfWeek}, ${hours}:${minutes}`;
  return formattedDate;
};

export const getImage = (condition_slug) => {
  switch (condition_slug) {
    case "storm":
      return require(`../../assets/storm.png`);
    case "snow":
      return require(`../../assets/snow.png`);
    case "hail":
      return require(`../../assets/hail.png`);
    case "rain":
      return require(`../../assets/rain.png`);
    case "fog":
      return require(`../../assets/fog.png`);
    case "clear_day":
      return require(`../../assets/clear_day.png`);
    case "clear_night":
      return require(`../../assets/clear_night.png`);
    case "cloud":
      return require(`../../assets/cloud.png`);
    case "cloudly_day":
      return require(`../../assets/cloudly_day.png`);
    case "cloudly_night":
      return require(`../../assets/cloudly_night.png`);
    case "none_day":
      return require(`../../assets/none_day.png`);
    case "none_night":
      return require(`../../assets/none_night.png`);
    default:
      return require(`../../assets/none_day.png`);
  }
};

export function sortSenhas(senhas) {
  senhas.sort((senhaA, senhaB) => {
    const dateA = new Date(senhaA.data);
    const dateB = new Date(senhaB.data);
    return dateB - dateA;
  });

  return senhas;
}
