import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import db from "../database/Firebase";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const SignIn = ({ navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // new User register by firebase
  const handleLoginUser = async () => {
    await db
       .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate("Main");
        })
        .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            fontFamily: "Cochin",
            color: "white",
          }}
        >
          Mini
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Input
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          testID="emailField"
          leftIcon={<Icon name="user" size={16} color="grey" />}
        />
        <Input
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          testID="passwordField"
          leftIcon={<Icon name="lock" size={16} color="grey" />}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLoginUser}
          testID="submitButton"
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#3b444b",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "midnightblue",
    borderColor: "#fff",
    justifyContent: "center",
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
    flexDirection: "column",
  },
  logoContainer: {
    paddingBottom: 120,
  },
});
export default SignIn;
