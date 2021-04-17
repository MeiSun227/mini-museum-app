import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";

const { height, width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.91;
const ITEM_HEIGHT = height * 0.2;

const EventList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}> Art Event </Text>
      <View style={{ margin: 12, flex: 0.7, padding: 5 }}>
        <View style={styles.border}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Collection");
            }}
          >
            <View style={styles.carousel}>
              <Image
                source={require("../images/header-19.jpg")}
                style={styles.image}
              />
              <Text style={styles.textBody}>Egyptian Art Collection</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.border}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Collection");
            }}
          >
            <View style={styles.carousel}>
              <Image
                source={require("../images/899.jpg")}
                style={styles.image}
              />
              <Text style={styles.textBody}>Chinese Art Collection</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#3b444b",
    alignItems: "center",
    width: width,
  },
  textHeader: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
  },
  textBody: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    bottom: 80,
  },
  border: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    borderRadius: 5,
    margin: 12,
  },
  carousel: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    resizeMode: "cover",
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
    opacity: 0.7,
    bottom: 120,
  },
});

export default EventList;
