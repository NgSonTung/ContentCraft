import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import Styles from "./Prompt.module.scss";
import Close from "../../assets/Close.svg";
import Copy from "../../assets/Copy.svg";
import Clipboard from "@react-native-clipboard/clipboard";

export default function Prompt({
  input,
  style,
  title,
  value,
  setValue = () => {},
}) {
  const inputRef = useRef();

  const copyToClipboard = () => {
    !input && value && Clipboard.setString(value);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setValue(text);
  };

  const handleChangeText = (text) => {
    setValue(text);
  };

  const handleClearText = () => {
    inputRef?.current?.clear();
  };

  return (
    <View style={{ ...style, ...Styles.container }} onPress>
      <Text style={Styles.title}>{title}</Text>
      <View style={Styles.wrapper}>
        {input ? (
          <TouchableOpacity
            onPress={handleClearText}
            style={Styles.close_icon_wrapper}
          >
            <Close style={Styles.close_icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={copyToClipboard}
            style={Styles.copy_icon_wrapper}
          >
            <Copy style={Styles.copy_icon} />
          </TouchableOpacity>
        )}
        {input ? (
          <TextInput
            returnKeyType="done"
            multiline={true}
            style={Styles.text}
            onChangeText={(text) => handleChangeText(text)}
            placeholder="lorem ipsum"
            ref={inputRef}
            value={value}
          />
        ) : (
          <ScrollView>
            <Text selectable>{value}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
