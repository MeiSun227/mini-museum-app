import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import EgyptianArtItem from "../components/EgyptianArtItem";
import ArtDetail from "../components/ArtDetail";
import EventList from "../components/EventList";
import SongDynastyItem from "../components/SongDynastyItem";

const Stack = createSharedElementStackNavigator();

const SharedElementNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Events" component={EventList} />
      <Stack.Screen name="EgyptianCollection" component={EgyptianArtItem} />
      <Stack.Screen name="SongCollection" component={SongDynastyItem} />
      <Stack.Screen name="Detail" component={ArtDetail} />
    </Stack.Navigator>
  );
};

export default SharedElementNavigation;
