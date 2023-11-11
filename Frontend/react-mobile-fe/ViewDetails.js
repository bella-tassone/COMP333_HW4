
import React, { useEffect, useState } from "react";
// FlatList renders items lazily, when they are about to appear, and removes
// items that scroll way off screen to save memory and processing time.
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from 'axios';
import { NavigationContainer } from "@react-navigation/native";


export default function ViewDetails({navigation, route}) {
  // Initially, set isLoading to true and set up the setLoading function for
  // later changing the isLoading value.
  const [isLoading, setLoading] = useState(true);
  // Initially, set data to an empty array and set up the setData function for
  // later changing the data value to the fetched data.
  const [rating, setRating] = useState([]);

  // The useEffect hook is similar to the componentDidMount and
  // componentDidUpdate in class components. For our anonymoust function, we will
  // have one parameter, fetch(), and an empty function body.
  // Note that items in a Django database can be retrieved that way as well.
  // Try it out with Postman.
  useEffect(() => {
    axios.get(`http://129.133.188.164/index.php/rating/get?limit=100`)
    .then((response) => {
        setRating(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Text style={styles.detailsText}>
        Song: {route.params.song}
      </Text>
      <Text style={styles.detailsText}>
        Artist: {route.params.artist}
      </Text>
      <Text style={styles.detailsText}>
        User: {route.params.user}
      </Text>
      <Text style={styles.detailsText}>
        Rating: {route.params.rating}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 25,
    color: "grey",
    textAlign: "center"
  }
});