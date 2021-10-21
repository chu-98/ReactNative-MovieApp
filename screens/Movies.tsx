import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
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
const Title = styled.Text``;

const API_KEY = "a695e0cfa850fe04e3cd07cd0027d795";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
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
        timeout={3}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }} />
            <BlurView intensity={70} style={StyleSheet.absoluteFill}>
              <Title>{movie.original_title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
