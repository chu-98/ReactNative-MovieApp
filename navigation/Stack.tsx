import React from "react";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { YELLOW } from "../colors";

const ScreenOne: React.FC<NativeStackScreenProps<any, "ScreenOne">> = ({
  navigation,
}) => (
  <TouchableOpacity onPress={() => navigation.navigate("Two")}>
    <Text>Go To Two</Text>
  </TouchableOpacity>
);
const ScreenTwo: React.FC<NativeStackScreenProps<any, "ScreenTwo">> = ({
  navigation,
}) => (
  <TouchableOpacity onPress={() => navigation.navigate("Three")}>
    <Text>Go To Three</Text>
  </TouchableOpacity>
);
const ScreenThree: React.FC<NativeStackScreenProps<any, "ScreenThree">> = ({
  navigation,
}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Tabs", { screen: "Search" })}
  >
    <Text>Go To Search</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      animation: "flip",
      headerTintColor: YELLOW,
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
