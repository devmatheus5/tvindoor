import { TextInput } from "react-native";
import styles from "../styles";
import { focusInput } from "../../../utils/functions";

export default function SenhaInput({ inputRef, formInput, setFormInput }) {
  return (
    <>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Digite o número da senha"
        showSoftInputOnFocus={false}
        value={formInput}
        onChangeText={setFormInput}
        clearTextOnFocus={true}
        onBlur={() => {
          focusInput(inputRef);
        }}
      />
    </>
  );
}
