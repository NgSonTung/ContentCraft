import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Styles from "./SubmitButton.module.scss";

export default function Prompt({ style, action, title }) {
  return (
    <TouchableOpacity
      onPress={action}
      style={{ ...style, ...Styles.container }}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
