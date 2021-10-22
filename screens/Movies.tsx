import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";

import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
`;
const TrendingScroll = styled.ScrollView`
  margin-top: 10px;
`;
const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 14px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
`;
const ListContainer = styled.View`
  margin-bottom: 20px;
`;
const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 13px;
`;
const HColumn = styled.View`
  margin-left: 13px;
  width: 80%;
`;
const Overview = styled.Text`
  color: white;
  width: 80%;
  opacity: 0.8;
`;
const Release = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 13px;
  margin-vertical: 3px;
`;
const Container = styled.ScrollView``;

const API_KEY = "a695e0cfa850fe04e3cd07cd0027d795";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpComing(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
        containerStyle={{
          marginBottom: 10,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.map(movie => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        {/* Trending Movies */}
        <ListTitle> Trending Movies </ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map(movie => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 12)}
                {movie.original_title.length > 12 ? "..." : null}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `⭐️${movie.vote_average}/10`
                  : `Coming Soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>

      {/* Coming Soon */}
      <ComingSoonTitle> Coming Soon </ComingSoonTitle>
      {upComing.map(movie => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko")}
            </Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 150
                ? `${movie.overview.slice(0, 150)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

export default Movies;
