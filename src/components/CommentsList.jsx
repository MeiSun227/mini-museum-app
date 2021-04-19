import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";

const CommentsList = () => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([
    { comment: "I like it a lot, will like to see in the musuem", id: 1 },
    { comment: "Great art", id: 2 },
  ]);

  const submitComment = (text) => {
    setComments([...comments, { comment: text, id: Math.random().toString() }]);
    setText("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeHolder="post comment"
        onChangeText={setText}
        value={text}
      />
      <Button
        title="enter"
        color="coral"
        onPress={() => submitComment(text)}
      ></Button>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
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
