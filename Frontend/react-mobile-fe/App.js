// App.js
import "react-native-gesture-handler";
import * as React from "react";
import { Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import ViewDetails from "./ViewDetails";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={ViewDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;