import React from "react";
import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: blue;
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movies</Title>
  </Btn>
);
export default Movies;
