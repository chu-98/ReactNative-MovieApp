import AppLoading from "expo-app-loading";

import React, { useState } from "react";
import { Text } from "react-native";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    // 이 부분이 로딩하고 싶은 것들은 전부 담는 부분
    // preload가 필요한 이유
    //1) 어떠한 이유로 켜지기 전에 API를 호출할 수 있다
    //2) Database를 열어두는 시간이 필요할 수 있다
    await new Promise(resolve => setTimeout(resolve, 10000));
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }
  return <Text>We are done Loading!</Text>;
}
