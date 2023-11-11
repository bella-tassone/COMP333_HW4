
import React, { useEffect, useState } from "react";
// FlatList renders items lazily, when they are about to appear, and removes
// items that scroll way off screen to save memory and processing time.
import { Text, View, Pressable, StyleSheet, Alert } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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

  const stars = (rating) => {
    const max = 5;
    const stars = [];

    for(let i=0; i<max; i++) {
        if (i<rating) {
            stars[i] = <FontAwesomeIcon icon="fa-solid fa-star" color="gold" size={25}/>;
        }
        else {
            stars[i] = <FontAwesomeIcon icon="fa-regular fa-star" color="gold" size={25}/>;
        }
    }
    return <Text>{stars}</Text>;
};

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 20
      }}
    >
      <Text style={styles.detailsText}>
        Song: {route.params.song}
      </Text>
      <Text style={styles.detailsText}>
        Artist: {route.params.artist}
      </Text>
      <Text style={styles.detailsText}>
        User: @{route.params.user}
      </Text>
      <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <Text style={styles.detailsText}>
          Rating:
        </Text>
        {stars(route.params.rating)}
      </View>
      <View style={{alignItems:'center', marginTop:30}}>
        <Pressable style={styles.button} onPress={() => Alert.alert("Simple Button pressed")}>
          <Text style={styles.text}>Update</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => Alert.alert("Simple Button pressed")}>
          <Text style={styles.text}>Delete</Text>
        </Pressable>
      </View>
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
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
    marginVertical:7,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});