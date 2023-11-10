// You can use both React and React Native.
// We want to use Hooks, useEffect and useState, from React in our functional
// App component. Hooks are functions that let developers "hook into" React
// state and lifecycle features from function components.
// In particular, we use useEffect for the fetch side-effect,
// i.e., fetching data from a server and useState for setting a state variable
// keeping track of whether the data to fetch is already loaded.
import React, { useEffect, useState } from "react";
// FlatList renders items lazily, when they are about to appear, and removes
// items that scroll way off screen to save memory and processing time.
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from 'axios';

export default function App() {
  // Initially, set isLoading to true and set up the setLoading function for
  // later changing the isLoading value.
  const [isLoading, setLoading] = useState(true);
  // Initially, set data to an empty array and set up the setData function for
  // later changing the data value to the fetched data.
  const [ratings, setRatings] = useState([]);

  // The useEffect hook is similar to the componentDidMount and
  // componentDidUpdate in class components. For our anonymoust function, we will
  // have one parameter, fetch(), and an empty function body.
  // Note that items in a Django database can be retrieved that way as well.
  // Try it out with Postman.
  useEffect(() => {
    axios.get(`http://172.21.44.203/index.php/rating/get?limit=100`)
    .then((response) => {
        setRatings(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  const handlePress = () => {
    Alert.alert("TouchableOpacity pressed");
  };

  return (
    // Now the component parses the data and renders it using a FlatList component.
    <View style={{ flex: 1, padding: 24 }}>
      {/* As long as isLoading is true, show "Loading ..." */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        // Once it is false, show the fetched data.
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, color: "grey", textAlign: "center" }}>
            Home
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
          </Text>
          <FlatList
            // We use various props of the built-in FlatList component.
            // data refers to our data; it is an array [ ].
            // The key from the data array is extracted using the keyExtractor
            // prop on the FlatList component.
            // renderItem takes an item from the data and renders it on a list.
            data={ratings}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>{item.song + " by " + item.artist}</Text>
              </TouchableOpacity>
            )}
          />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Add Song</Text>
              </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});