import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";

import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesAPI } from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
`;
const ListTitle = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
`;
const ComingSoonTitle = styled(ListTitle)`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  margin-bottom: 14px;
`;
const TrendingScroll = styled.FlatList`
  margin-top: 10px;
`;
const ListContainer = styled.View`
  margin-bottom: 20px;
`;
const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upComingLoading,
    data: upComingData,
    isRefetching: isRefetchingUpComing,
  } = useQuery(["movies", "upComing"], moviesAPI.upComing);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesAPI.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = item => item.id + "";
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingTrending;
  const loading = nowPlayingLoading || upComingLoading || trendingLoading;
  console.log(refreshing);
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={4}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map(movie => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              ItemSeparatorComponent={VSeparator}
              data={trendingData.results}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      keyExtractor={movieKeyExtractor}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HSeparator}
      data={upComingData.results}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
