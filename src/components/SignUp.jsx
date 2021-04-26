import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import db from "../database/Firebase";
import "firebase/firestore";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // new User register by firebase
  const handleRegisterUser = () => {
    db.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.firestore().collection("users").doc(db.auth().currentUser.uid).set({
          name,
          email,
        });
        navigation.navigate("Main");
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Welcome to Mini Museum App</Text>
      </View>
      <Input
        placeholder="username"
        value={name}
        onChangeText={setName}
        leftIcon={<Icon name="user" size={16} color="grey" />}
      />
      <Input
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        leftIcon={<Icon name="envelope" size={16} color="grey" />}
      />
      <Input
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        leftIcon={<Icon name="lock" size={16} color="grey" />}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterUser}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#3b444b",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
  headingText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "300",
    fontStyle: "italic",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
});
export default SignUp;
