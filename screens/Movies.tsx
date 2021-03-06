import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";

import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

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
const HSeparator = styled.View`
  height: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upComingLoading,
    data: upComingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "upComing"],
    moviesAPI.upComing,
    {
      getNextPageParam: currentPage => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesAPI.trending);
  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const loading = nowPlayingLoading || upComingLoading || trendingLoading;
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return loading ? (
    <Loader />
  ) : upComingData ? (
    <FlatList
      onEndReached={loadMore}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={2}
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
                // ?????? ??????, ???????????? ???????????? ??????! = null
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      keyExtractor={item => item.id + ""}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HSeparator}
      data={upComingData.pages.map(page => page.results).flat()}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
    />
  ) : null;
};

export default Movies;
