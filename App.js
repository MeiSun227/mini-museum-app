import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import AuthNavigation from "./src/navigator/AuthNavigation";
import CommentsList from "./src/components/CommentsList";

const App = () => {

  return <CommentsList />;
  // return <AuthNavigation />;
};

export default App;
