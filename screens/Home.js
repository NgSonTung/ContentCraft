import { View, TouchableWithoutFeedback, Image, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../assets/WhiteBG.png";
import Styles from "./Home.module.scss";
import Prompt from "../components/Prompt/Prompt";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-2255363849786101/9827175865";
const adUnitId1 = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-2255363849786101/5667566864";

const interstitial = InterstitialAd.createForAdRequest(adUnitId1, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

export default function App({ style }) {
  const [originalText, setOriginalText] = useState("");
  const [enhancedText, setEnhancedText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
        interstitial.show();
      }
    );
    // Start loading the interstitial straight away
    interstitial.load();
    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);
  if (!loaded) {
    return null;
  }

  const Enhance = async () => {
    const rq = `Original Text: ${originalText}\nEnhance the writing to improve grammar, sentence structure, and overall clarity, return the enhanced text only.`;
    console.log("called");
    setEnhancedText("Loading...");
    await axios
      .post("http://13.127.61.65:3000/message", { msg: rq })
      .then((res) => {
        console.log("done");
        setEnhancedText(res.data);
      })
      .catch((err) => console.log(err));
  };

  const Generate = async () => {
    const rq = `Prompts: ${originalText}\nWrite a paragraph using the provided prompts, return the paragraph only.`;
    console.log("called");
    setEnhancedText("Loading...");
    await axios
      .post("http://13.127.61.65:3000/message", { msg: rq })
      .then((res) => {
        console.log("done");
        setEnhancedText(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...style, ...Styles.container }}>
        <View style={Styles.ad}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
        <Prompt
          input={true}
          style={Styles.prompt}
          title={"Let the Words Flow"}
          setValue={setOriginalText}
        />
        <View style={{ ...style, ...Styles.buttonWrapper }}>
          <SubmitButton
            style={Styles.button}
            title={"Enhance"}
            action={Enhance}
          />
          <SubmitButton
            style={Styles.button}
            title={"Generate Content"}
            action={Generate}
          />
        </View>
        <Prompt value={enhancedText} title={"Voila! Improved Writing"} />
        <Image style={Styles.background} source={Background} />
      </View>
    </TouchableWithoutFeedback>
  );
}
