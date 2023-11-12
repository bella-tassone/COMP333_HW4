// App.js
import "react-native-gesture-handler";
import * as React from "react";
import { Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import ViewDetails from "./ViewDetails";
import Login from "./Login";
import Registration from "./Registration";
import UserDetails from "./UserDetails";
import SearchResults from "./SearchResults";
import LogOut from "./LogOut";



import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as farFaStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar} from '@fortawesome/free-solid-svg-icons';

library.add(farFaStar, fasFaStar);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={ViewDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Log Out" component={LogOut} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="User Details" component={UserDetails} />
        <Stack.Screen name="Search Results" component={SearchResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;