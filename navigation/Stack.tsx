import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BLACK, YELLOW } from "../colors";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: "flip",
        headerTintColor: YELLOW,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK,
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
