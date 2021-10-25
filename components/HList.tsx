import React from "react";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { FlatList } from "react-native";

const ListTitle = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 10px;
`;
const ListContainer = styled.View`
  margin-vertical: 20px;
`;
export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      ItemSeparatorComponent={HListSeparator}
      data={data}
      keyExtractor={item => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_name ?? item.original_title}
          voteAverage={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
