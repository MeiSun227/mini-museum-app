import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardingScreen from "../components/OnBoardingScreen";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import SharedElementNavigation from "./SharedElementNavigation";

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="onBoarding" component={OnBoardingScreen} />
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="Main" component={SharedElementNavigation} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
