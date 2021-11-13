import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0px 15px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 11px;
  width: 80%;
`;
const Overview = styled.Text`
  margin-top: 4px;
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  width: 80%;
  opacity: 0.8;
`;
const Release = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 500;
  font-size: 13px;
  margin-vertical: 3px;
`;
const Title = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData: Movie;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
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
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>
            {originalTitle.length > 20
              ? `${originalTitle.slice(0, 20)}...`
              : originalTitle}
          </Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>
            {overview !== "" && overview.length > 150
              ? `${overview.slice(0, 150)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
