import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableOpacityBase,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const ArtDetail = ({ route, navigation }) => {
  const [heart, setHeart] = useState(false);
  const { item } = route.params;

  const handleHeart = () => {
    setHeart(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="#fff"
        style={{ top: 10, zIndex: 2 }}
        onPress={navigation.goBack}
      />

      <SharedElement
        id={`item.${item.key}.primaryImage`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View style={[StyleSheet.absoluteFillObject]}>
          <Image
            style={[StyleSheet.absoluteFillObject, { resizeMode: "cover" }]}
            source={{ uri: item.primaryImage }}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
            alignContent: "center",
            marginBottom: 80,
            paddingHorizontal: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.textFont}>{item.title}</Text>
          </View>
          <Text style={styles.textDetail}>{item.dimensions}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View style={{ flexDirection: "row", padding: 8 }}>
              {heart ? (
                <AntDesign
                  name="heart"
                  size={24}
                  color="red"
                  onPress={handleHeart}
                />
              ) : (
                <AntDesign
                  name="hearto"
                  size={22}
                  color="white"
                  onPress={handleHeart}
                />
              )}
            </View>
            <View style={{ flexDirection: "row", padding: 8 }}>
              <FontAwesome name="commenting-o" size={22} color="white" />
            </View>
            <View style={{ flexDirection: "row", padding: 8 }}>
              <FontAwesome name="share" size={22} color="white" />
            </View>
          </View>
        </View>
      </SharedElement>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textFont: {
    fontWeight: "400",
    color: "#fff",
    fontSize: 28,
    position: "absolute",
    padding: 5,
  },
  textDetail: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    margin: 10,
    padding: 10,
  },
});

ArtDetail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.primaryImage`,
    },
    {
      id: `item.${item.key}.title`,
    },
  ];
};
export default ArtDetail;
