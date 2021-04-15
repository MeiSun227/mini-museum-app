import React, { useRef } from "react";
import {
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const bgc = ["#BDD1C5", "#D4A29C", "#608FB7"];
const labelData = [
  {
    key: "351",
    title: "Can't go to museum?",
    description: "Feel bored at home because of Corona?",
    image:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg",
  },

  {
    key: "3571572",
    title: "Welcome to Mini Museum App",
    description: "we can mini museum that give youe surprise",
    image: "https://image.flaticon.com/icons/png/256/3571/3571572.png",
  },
  {
    key: "3571573",
    title: "Explore the Museum with your mobile",
    description:
      "You can easily acess the biggest collection art in the world!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571572.png",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    flex: 1,
  },

  image: {
    height: width / 2,
    width: width / 2,
    resizeMode: "contain",
  },
});
const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "abosulte", bottom: 100, flexDirection: "row" }}>
      {labelData.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator -${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              opacity,
              backgroundColor: "#fff",
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const BackDrop = ({ scrollX }) => {
  const backgroundColors = scrollX.interpolate({
    inputRange: bgc.map((_, i) => i * width),
    outputRange: bgc.map((backgroundColors) => backgroundColors),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: backgroundColors,
        },
      ]}
    />
  );
};

const Square = ({ scrollX }) => {
  const WaveEffect = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );
  const rotate = WaveEffect.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });
  return (
    <Animated.View
      style={{
        height: height,
        width: height,
        borderRadius: 85,
        position: "absolute",
        backgroundColor: "#fff",
        top: -height * 0.7,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
        ],
      }}
    />
  );
};

const OnBoardingScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        data={labelData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: "center" }}>
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    fontSize: 32,
                    textAlign: "center",
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ fontSize: 16, textAlign: "center", color: "#fff" }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Button
          title="SignIn"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        />
        <Button
          title="Not a users yet?"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default OnBoardingScreen;
