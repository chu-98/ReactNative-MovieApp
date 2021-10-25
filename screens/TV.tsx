import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TvAPI } from "../api";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";

const TV: React.FC<NativeStackScreenProps<any, "TV">> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["TV", "trending"], TvAPI.trending);
  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isRefetching: isRefetchingAiringToday,
  } = useQuery(["TV", "airingToday"], TvAPI.airingToday);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: isRefetchingTopRated,
  } = useQuery(["TV", "topRated"], TvAPI.topRated);

  const onRefresh = async () => {
    queryClient.refetchQueries(["TV"]);
  };
  const refreshing =
    isRefetchingTrending || isRefetchingAiringToday || isRefetchingTopRated;

  const loading = trendingLoading || airingTodayLoading || topRatedLoading;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={airingTodayData.results} />
      <HList title="Top Rated TV" data={topRatedData.results} />
    </ScrollView>
  );
};

export default TV;
