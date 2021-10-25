import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";

import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesAPI } from "../api";

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
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upComingLoading,
    data: upComingData,
    isRefetching: isRefetchingUpComing,
  } = useQuery<MovieResponse>(["movies", "upComing"], moviesAPI.upComing);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesAPI.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingTrending;
  const loading = nowPlayingLoading || upComingLoading || trendingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : upComingData ? (
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
            {nowPlayingData?.results.map(movie => (
              <Slide
                key={movie.id}
                // 없을 경우, 이미지를 나오게끔 설정! = null
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <TrendingScroll
                horizontal
                keyExtractor={item => item.id + ""}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                ItemSeparatorComponent={VSeparator}
                data={trendingData.results}
                renderItem={({ item }) => (
                  <VMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                )}
              />
            ) : null}
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      keyExtractor={item => item.id + ""}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HSeparator}
      data={upComingData.results}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};

export default Movies;
