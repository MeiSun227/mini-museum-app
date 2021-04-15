import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import useEgyptianArtApi from "../hooks/useEgyptianArtApi";
import { SharedElement } from "react-navigation-shared-element";

const { height, width } = Dimensions.get("screen");
const OVERFLOWITEM = 70;
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = height * 0.6;
const FULL_SIZE = ITEM_WIDTH * 2;

const HomeScreen = ({ navigation }) => {
  const { artObjects } = useEgyptianArtApi();

  const art = artObjects ? artObjects.map((artObj) => artObj) : [];
  console.log(artObjects);

  return (
    <View style={styles.container}>
      <View style={{ padding: 10, top: 50 }}>
        <Text style={styles.textHeader}>Egyptian Art</Text>
      </View>
      <FlatList
        data={art}
        keyExtractor={(item) => item.title}
        horizontal
        inverted
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Detail", { item });
                }}
                style={styles.border}
              >
                <SharedElement
                  id={`item.${item.key}.photo`}
                  style={[StyleSheet.absoluteFillObject]}
                >
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      { overflow: "hidden", borderRadius: 2 },
                    ]}
                  >
                    <Image
                      style={[StyleSheet.absoluteFillObject, styles.carousel]}
                      source={{ uri: item.primaryImage }}
                    />
                  </View>
                </SharedElement>
              </TouchableOpacity>
              <Text style={styles.textFont}>{item.title}</Text>
              <Text style={styles.textSmall}>
                {item.objectDate} {item.dynasty}
              </Text>
              <Text style={styles.textSmall}>{item.region}</Text>
              <Text style={styles.textSmall}>{item.dimensions}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
    bottom: 5,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  border: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    borderRadius: 5,
  },
  carousel: {
    borderRadius: 16,
    borderWidth: 10,
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
  container: {
    flex: 1,
    backgroundColor: "#3b444b",
  },
  textFont: {
    fontWeight: "100",
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    padding: 8,
    margin: 8,
  },
  textSmall: {
    fontWeight: "100",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  textHeader: {
    fontWeight: "200",
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
  },
});

export default HomeScreen;