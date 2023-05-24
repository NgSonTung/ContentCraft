import { View, TouchableWithoutFeedback, Image, Keyboard } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Background from "../assets/WhiteBG.png";
import Styles from "./Home.module.scss";
import Prompt from "../components/Prompt/Prompt";
import SubmitButton from "../components/SubmitButton/SubmitButton";

export default function App({ style }) {
  const [originalText, setOriginalText] = useState("");
  const [enhancedText, setEnhancedText] = useState("");

  const Enhance = async () => {
    const rq = `Original Text: ${originalText}\nEnhance the writing to improve grammar, sentence structure, and overall clarity, return the enhanced text only.`;
    console.log("called");
    return await axios
      .post("http://13.127.61.65:3000/message", { msg: rq })
      .then((res) => {
        setEnhancedText(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...style, ...Styles.container }}>
        <Prompt
          input={true}
          style={Styles.prompt}
          title={"Let the Words Flow"}
          setText={setOriginalText}
        />
        <View style={{ ...style, ...Styles.buttonWrapper }}>
          <SubmitButton
            style={Styles.button}
            title={"Enhance"}
            action={Enhance}
          />
          <SubmitButton style={Styles.button} title={"Enhance"} />
        </View>
        <Prompt enhancedText={enhancedText} title={"Voila! Improved Writing"} />
        <Image style={Styles.background} source={Background} />
      </View>
    </TouchableWithoutFeedback>
  );
}
