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
import AddRating from "./AddRating";
import DeleteRating from "./DeleteRating";
import UpdateRating from "./UpdateRating";




import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as farFaStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar} from '@fortawesome/free-solid-svg-icons';

library.add(farFaStar, fasFaStar);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}  />
        <Stack.Screen name="Details" component={ViewDetails} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}  />
        <Stack.Screen name="Log Out" component={LogOut} options={{headerShown: false}}  />
        <Stack.Screen name="Registration" component={Registration} options={{headerShown: false}}  />
        <Stack.Screen name="User Details" component={UserDetails} options={{headerShown: false}}  />
        <Stack.Screen name="Search Results" component={SearchResults} options={{headerShown: false}}  />
        <Stack.Screen name="AddRating" component={AddRating} options={{ headerShown: false }} />
        <Stack.Screen name="DeleteRating" component={DeleteRating} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateRating" component={UpdateRating} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;