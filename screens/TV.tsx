import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TvAPI } from "../api";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";

const TV: React.FC<NativeStackScreenProps<any, "TV">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["TV", "trending"],
    TvAPI.trending
  );
  const { isLoading: airingTodayLoading, data: airingTodayData } = useQuery(
    ["TV", "airingToday"],
    TvAPI.airingToday
  );
  const { isLoading: topRatedLoading, data: topRatedData } = useQuery(
    ["TV", "topRated"],
    TvAPI.topRated
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["TV"]);
    setRefreshing(false);
  };

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
