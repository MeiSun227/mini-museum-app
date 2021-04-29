import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import useSongDynastyApi from "../hooks/useSongDynastyApi";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = height * 0.5;

const SongDynastyItem = ({ navigation }) => {
  const { artObjects } = useSongDynastyApi();

  const art = artObjects ? artObjects.map((artObj) => artObj) : [];

  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="#fff"
        style={{ top: 30, left: 10, zIndex: 2 }}
        onPress={navigation.goBack}
      />
      <View style={{ padding: 10 }}>
        <Text style={styles.textHeader}>Song Dynasty</Text>
      </View>

      <FlatList
        data={art}
        keyExtractor={(item) => item.objectID.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Detail", { item });
                }}
                style={styles.border}
              >
                <SharedElement
                  id={`item.${item.key}.primaryImage`}
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
              <View
                style={{ flex: 1, alignItem: "center",justifyContent:'flex-start', marginHorizontal: width.padding }}
              >
                <Text style={styles.textFont}>{item.title}</Text>
                <Text style={styles.textSmall}>
                  {item.objectDate} {item.dynasty}
                </Text>
                <Text style={styles.textSmall}>{item.dimensions}</Text>
              </View>
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
    padding:20
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
    marginBottom: 35,
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
  },
  textSmall: {
    fontWeight: "100",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  textHeader: {
    fontWeight: "200",
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
  },
});

export default SongDynastyItem;
