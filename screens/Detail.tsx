import React, { useEffect } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Poster from "../components/Poster";
import {
  Dimensions,
  StyleSheet,
  useColorScheme,
  Linking,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK } from "../colors";
import { useQuery } from "react-query";
import { Movie, moviesAPI, TV, TvAPI } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Data = styled.View`
  padding: 0px 20px;
`;
const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
font-size: 30px
font-weight: 500
align-self: flex-end;
margin-left: 12px
color: white;
`;
const Overview = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  margin: 20px 0px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: ${props => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `http://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck It Out: ${homepage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    }
  };
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesAPI.detail : TvAPI.detail
  );
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={shareMedia}>
            <Ionicons name="share-outline" color="white" size={24} />
          </TouchableOpacity>
        ),
      });
    }
  }, [data]);
  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await WebBrowser.openBrowserAsync(baseUrl);
    await Linking.openURL(baseUrl);
  };
  const isDark = useColorScheme() === "dark";
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path) || "" }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", BLACK]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results.map(mv => (
          <VideoBtn key={mv.key} onPress={() => openYTLink(mv.key)}>
            <Ionicons name="logo-youtube" color="red" size={24} />
            <BtnText>{mv.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};
export default Detail;
