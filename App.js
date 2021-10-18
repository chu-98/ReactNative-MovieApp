import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { Text } from "react-native";

export default function App() {
  const [loaded] = Font.useFonts(Ionicons.font);
  if (!loaded) {
    return <AppLoading />;
  }
  return <Text>We are done Loading!</Text>;
}
