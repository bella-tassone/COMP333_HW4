
import React, { useEffect, useState } from "react";
// FlatList renders items lazily, when they are about to appear, and removes
// items that scroll way off screen to save memory and processing time.
import { Text, View, Pressable, StyleSheet, Alert } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function ViewDetails({navigation, route}) {

  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState([]);

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
            stars[i] = <FontAwesomeIcon key={i} icon="fa-solid fa-star" color="gold" size={25}/>;
        }
        else {
            stars[i] = <FontAwesomeIcon key={i} icon="fa-regular fa-star" color="gold" size={25}/>;
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