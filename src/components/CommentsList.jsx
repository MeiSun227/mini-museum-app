import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import db from "../database/Firebase";

const CommentsList = () => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const saveComment = () => {
    db.database()
      .ref("comments/")
      .push({ comment: text });
  };

  useEffect(() => {
    db.database()
      .ref("comments/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data) {
            console.log("data")
            const cs = Object.values(data).map(c => {
                return {"comment": c}
            })
            console.log(cs)
            setComments(cs)
        } else {
            setComments([])
        }
      });
  }, []);

  const submitComment = (text) => {
    setComments([...comments, { saveComment }]);
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
