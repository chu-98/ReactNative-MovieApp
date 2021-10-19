import React from "react";
import { Text, View, useColorScheme } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { YELLOW, BLACK } from "../colors";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  // True or False로 받는다
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW : BLACK,
        tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
        headerStyle: {
          backgroundColor: isDark ? BLACK : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK,
        },
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="TV" component={TV} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
