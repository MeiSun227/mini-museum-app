import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardingScreen from "../components/OnBoardingScreen";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import SharedElementNavigation from "./SharedElementNavigation";
import db from "../database/Firebase";

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  const [loading, setLoading] = useState(false);
  

  db.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  });

  return (
    <NavigationContainer>
      {loading ? (<AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="onBoarding" component={OnBoardingScreen} />
          <AuthStack.Screen name="SignIn" component={SignIn} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="Main" component={SharedElementNavigation} />
        </AuthStack.Navigator> ) :
        (<SharedElementNavigation />
      )}
    </NavigationContainer>
  );
};

export default AuthNavigation;
