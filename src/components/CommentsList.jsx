import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";




const CommentsList = () => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const submitComment = (content) => {
    setComments([...comments, { saveComment }]);
  };

  return (
    <View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.comment}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text>{item.comment}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  item: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#bbb",
    borderWidth: 1,
    marginTop: 5,
  },
  input: {
    marginTop: 50,
    marginBottom: 5,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default CommentsList;
