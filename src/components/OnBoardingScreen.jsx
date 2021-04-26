import React, { useRef } from "react";
import {
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const bgc = ["midnightblue", "goldenrod", "yellowgreen"];
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
    outputRange: ["65deg", "0deg", "65deg"],
  });
  return (
    <Animated.View
      style={{
        height: height,
        width: height,
        borderRadius: 45,
        position: "absolute",
        backgroundColor: "#fff",
        top: -height * 0.5,
        left: -height * 0.6,
        transform: [
          {
            rotate,
          },
        ],
      }}
    >
</Animated.View>
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
        scrollEventThrottle={48}
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
              <View style={{ flex: 0.78, justifyContent: "center"}}>
                <Text style={{fontSize:36,fontWeight:"600",fontFamily: "Cochin"}}>Mini</Text>
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
        style={{ marginVertical: 8,
        }}
      >
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{color:'white'}}>Not a users yet?</Text>
        </TouchableOpacity>
      </View>
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default OnBoardingScreen;
