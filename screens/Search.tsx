import React, { useState } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesAPI, TvAPI } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: #f0f0f0;
  padding: 15px 17px;
  border-radius: 12px;
  width: 90%;
  margin: 20px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesAPI.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTV,
  } = useQuery(["searchTV", query], TvAPI.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTV();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="black"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};
export default Search;
