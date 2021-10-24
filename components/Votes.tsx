import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

const Text = styled.Text`
  color: ${props =>
    props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0, 0, 0, 0.8)"};
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
