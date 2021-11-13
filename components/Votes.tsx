import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

const Text = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 13px;
`;

interface VotesProps {
  votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => {
  const isDark = useColorScheme() === "dark";
  return <Text>{votes > 0 ? `⭐️${votes}/10` : `Coming Soon`}</Text>;
};

export default Votes;
