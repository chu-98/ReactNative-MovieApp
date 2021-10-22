import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image``;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  margin-left: 14px;
`;
const Column = styled.View`
  width: 60%;
  margin-left: 8px;
`;
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 20px;
  font-weight: 700;
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
`;
const OverView = styled.Text<{ isDark: boolean }>`
  margin-top: 7px;
  color: ${props =>
    props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
const Votes = styled(OverView)`
  font-size: 12px;
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg source={{ uri: makeImgPath(backdrop_path) }} />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title isDark={isDark}>{original_title}</Title>
            {vote_average > 4 ? (
              <Votes isDark={isDark}>⭐️{vote_average}/10</Votes>
            ) : null}
            <OverView isDark={isDark}>{overview.slice(0, 90)}...</OverView>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
