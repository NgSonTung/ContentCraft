import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Home from "./screens/Home.js";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
