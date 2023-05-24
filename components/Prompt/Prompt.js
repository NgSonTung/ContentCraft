import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import Styles from "./Prompt.module.scss";
import Close from "../../assets/Close.svg";

export default function Prompt({
  enhancedText,
  style,
  title,
  input,
  setText = () => {},
}) {
  const handleChangeText = (text) => {
    setText(text);
  };

  return (
    <View style={{ ...style, ...Styles.container }} onPress>
      <Text style={Styles.title}>{title}</Text>
      <View style={Styles.wrapper}>
        <Close style={Styles.close} />
        {input ? (
          <TextInput
            returnKeyType="done"
            multiline={true}
            style={Styles.text}
            onChangeText={(text) => handleChangeText(text)}
            placeholder="lorem ipsum"
          />
        ) : (
          <Text>{enhancedText}</Text>
        )}
      </View>
    </View>
  );
}
