import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { BlurView } from "expo-blur";

import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { makeImgPath } from "../utils";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
`;
const Container = styled.ScrollView``;
const View = styled.View`
  flex: 1;
`;
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Poster = styled.Image`
width: 100px
height: 160px
border-radius: 6px
`;
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
const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
`;
const OverView = styled.Text`
  margin-top: 7px;
  color: rgba(255, 255, 255, 0.7);
`;
const Votes = styled(OverView)`
  font-size: 12px;
`;

const API_KEY = "a695e0cfa850fe04e3cd07cd0027d795";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  useEffect(() => {
    getNowPlaying();
  }, []);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    console.log(results);
    setNowPlaying(results);
    setLoading(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }} />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={80}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  {movie.vote_average > 4 ? (
                    <Votes>⭐️{movie.vote_average}/10</Votes>
                  ) : null}
                  <OverView>{movie.overview.slice(0, 90)}...</OverView>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
