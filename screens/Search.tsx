import React, { useState } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesAPI, TvAPI } from "../api";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: #485460;
  padding: 15px 17px;
  border-radius: 12px;
  width: 90%;
  margin: 20px auto;
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
        placeholderTextColor="white"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
};
export default Search;
