import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import styles from "./styles";
import React, { useContext, useEffect } from "react";
import SenhasComponent from "./components/senhas";
import NewsCard from "./components/newsCard";
import VideosCard from "./components/videosCard";
import VtCard from "./components/vt";
import OverlayNew from "./components/overlayNew";
import { Senhas } from "../../services/values";
import { AuthContext } from "../../hooks/auth";
function MediaScreen() {
  const inputRef = React.useRef(null);
  const [formInput, setFormInput] = React.useState("");
  const [newBalcao, setNewBalcao] = React.useState();
  const [isOpened, setIsOpened] = React.useState(false);
  const { value } = useContext(AuthContext);
  const handleNewBalcao = () => {
    if (formInput === "") {
      return;
    }
    const data = {
      value: parseInt(formInput),
      type: "balcao",
      data: new Date().toISOString(),
      status: "pendente",
    };
    setNewBalcao(data);
    setIsOpened(true);
    setTimeout(() => {
      setIsOpened(false);
    }, 5000);

    Senhas.push(data);
    setFormInput("");
  };
  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    const keys = inputRef.current;
    if (!keys) {
      return;
    }
    focusInput();
  }, [inputRef.current]);
  return (
    <KeyboardAvoidingView behavior="height" style={styles.body}>
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.video}>
            {!value.user?.hnews && <NewsCard />}

            {value?.user?.hnews && <VideosCard />}
            <VtCard />
          </View>

          <SenhasComponent
            Senhas={Senhas}
            inputRef={inputRef}
            focusInput={focusInput}
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Digite o número da senha"
            keyboardType="numeric"
            showSoftInputOnFocus={true}
            value={formInput}
            onChangeText={setFormInput}
            onSubmitEditing={() => handleNewBalcao()}
            onBlur={() => focusInput()}
          />
        </View>
        {isOpened && <OverlayNew newBalcao={newBalcao} />}
      </View>
    </KeyboardAvoidingView>
  );
}
export default React.memo(MediaScreen);
