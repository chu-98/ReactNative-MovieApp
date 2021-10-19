import React from "react";
import { Text, View, useColorScheme } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";

import { Ionicons } from "@expo/vector-icons";
import { YELLOW, BLACK, LIGHT_GREY } from "../colors";

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
        tabBarInactiveTintColor: isDark ? "#d2dae2" : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 14,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
