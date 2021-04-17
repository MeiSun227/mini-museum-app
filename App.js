import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createSharedElementStackNavigator} from "react-navigation-shared-element"
import AuthNavigation from './src/navigator/AuthNavigation';
import EgyptianArtItem from './src/components/EgyptianArtItem'
import ArtDetail from './src/components/ArtDetail'
import EventList from './src/components/EventList'


const Stack = createSharedElementStackNavigator()
const App = () => {

  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    
    //       screenOptions={{
    //       headerShown: false,
    //     }}
  
    //      >
    //         <Stack.Screen name="Event" component={EventList}  />
    //       <Stack.Screen name="Collection" component={EgyptianArtItem}  />
    //       <Stack.Screen name="Detail" component={ArtDetail}  />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <AuthNavigation />
  );
}

export default App;