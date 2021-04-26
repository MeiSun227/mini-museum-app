import * as React from "react";
import {
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  Button,
  View,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);
const DURATION = 3000;
const TEXT_DURATION = DURATION * 0.8;

const Circle = ({ onPress, animatedValue, index, animatedValue2 }) => {
  const { initialBgColor, nextBgColor, bgColor } = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBgColor = animatedValue.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });

  const circleBgColor = animatedValue.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor: containerBgColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBgColor,
            transform: [
              { perspective: 400 },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0%", "50%", "0%"],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.circleButton,
              {
                transform: [
                  {
                    scale: animatedValue2.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                      // extrapolate: "clamp"
                    }),
                  },
                  {
                    rotateY: animatedValue2.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ["0deg", "180deg", "180deg", "180deg"],
                    }),
                  },
                ],
                opacity: animatedValue2.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}
          >
            <AnimatedAntDesign name="arrowright" size={28} color={"white"} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const NewLanding = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const textinputRange = [...Array(landingContent.length).keys()];

  const changePageHandle = () => {
    navigation.navigate("SignIn");
  };

  //function define animate timing and action
  const animateAction = (i) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);
  // on press tirigger the animate action
  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animateAction((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      <Circle
        onPress={onPress}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
        index={index}
      />

      <Animated.View
        style={{
          flexDirection: "row",
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange: textinputRange,
                outputRange: landingContent.map((_, i) => -i * width * 2),
              }),
            },
          ],
        }}
      >
        {landingContent.slice(0, colors.length).map(({ content }, i) => {
          return (
            <View style={styles.textContainer} key={i}>
              <Text style={[styles.content, { color: colors[i].nextBgColor }]}>
                {content}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
    paddingBottom: 100,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  circleButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    margin: 12,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Menlo",
    color: "white",
  },
  textContainer: {
    paddingRight: width,
    width: width * 2,
  },
});

//bg color set
const colors = [
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "#222",
  },
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "yellowgreen",
  },
  {
    initialBgColor: "#222",
    bgColor: "yellowgreen",
    nextBgColor: "midnightblue",
  },
  {
    initialBgColor: "yellowgreen",
    bgColor: "midnightblue",
    nextBgColor: "turquoise",
  },
];

const landingContent = [
  {
    content:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped at home.",
  },
  {
    content:
      "Let's do something to change the boredom time waiting at home? But how?",
  },
  {
    content: "The fastest way to build an app.",
  },
  {
    content: "Stay home but explore the greatest art in the world",
  },
];

export default NewLanding;
