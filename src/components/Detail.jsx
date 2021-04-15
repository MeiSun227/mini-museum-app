import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";

const Detail = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        name="arrowleft"
        size={32}
        color="#fff"
        style={{ top: 10, zIndex: 2 }}
        onPress={navigation.goBack}
      />
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View style={[StyleSheet.absoluteFillObject]}>
          <Image
            style={[StyleSheet.absoluteFillObject, { resizeMode: "cover" }]}
            source={{ uri: item.primaryImage }}
          />
        </View>
      </SharedElement>

      <Text style={styles.textFont}>{item.title}</Text>

      <View style={styles.carousel}>
        <Text>heloo</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textFont: {
    fontWeight: "200",
    color: "#fff",
    fontSize: 28,
    position: "absolute",
    top: 50,
    left: 16,
  },

  carousel: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOpacity: 1,
    backgroundColor: "#fff",
    opacity: 0.2,
    left: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    resizeMode: "cover",
    position: "absolute",
    bottom: 120,
  },
});

Detail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.photo`,
    },
    {
      id: `item.${item.key}.title`,
    },
  ];
};
export default Detail;
