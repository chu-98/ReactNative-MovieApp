import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
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
  color: ${props =>
    props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0, 0, 0, 0.8)"};
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
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
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
  );
};

export default HMedia;
