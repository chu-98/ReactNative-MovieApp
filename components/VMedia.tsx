import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Title = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Movie = styled.View`
  align-items: center;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {originalTitle.slice(0, 9)}
        {originalTitle.length > 9 ? "..." : null}
      </Title>
      <Votes votes={voteAverage} />
    </Movie>
  );
};

export default VMedia;
