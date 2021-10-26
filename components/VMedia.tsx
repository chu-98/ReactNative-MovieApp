import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Title = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Container = styled.View`
  align-items: center;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 9)}
          {originalTitle.length > 9 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
