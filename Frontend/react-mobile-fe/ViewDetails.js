import React, { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet, Alert } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function ViewDetails({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState([]);
  const user = route.params.currentUser;

  // fetches rating details
  useEffect(() => {

    // IMPORTANT!!! Replace IP address below with your own (xxx.xx.xx.xxx)
    axios.get(`http://172.21.44.2033/index.php/rating/get?limit=100`)
    .then((response) => {
        setRating(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  // renders stars in place of numerical rating
  const stars = (rating) => {
    const max = 5;
    const stars = [];

    for (let i = 0; i < max; i++) {
      if (i < rating) {
        stars[i] = <FontAwesomeIcon key={i} icon="fa-solid fa-star" color="gold" size={25} />;
      }
      else {
        stars[i] = <FontAwesomeIcon key={i} icon="fa-regular fa-star" color="gold" size={25} />;
      }
    }
    return <Text>{stars}</Text>;
  };

  // processes user's request to delete rating
  const handleDeleteRating = () => {
    navigation.navigate("DeleteRating", { id: route.params.id, user: route.params.user, onRatingDeleted: route.params.onRatingDeleted });
  };

  // navigates to update rating page
  const handleUpdateRating = () => {
    const { id, user, song, artist, rating, currentUser, onRatingUpdated } = route.params;
    navigation.navigate("UpdateRating", { id, user, song, artist, rating, currentUser, onRatingUpdated });
  };

  return (
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
      {(user!='empty' && user!=null) ? (
      <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>{"Username: " + user}</Text>
      ) : null}
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
        <View style={{ alignItems: 'flex-end' }}>
          <Pressable style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
        </View>
        <Text style={styles.detailsText}>
          Song: {route.params.song}
        </Text>
        <Text style={styles.detailsText}>
          Artist: {route.params.artist}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.detailsText}>{'User: '}</Text>
          <Pressable onPress={() => navigation.navigate("User Details", { user: route.params.user, currentUser: user })}>
            <Text style={styles.userText}>{'@' + route.params.user}</Text>
          </Pressable>
        </View>
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
        {(route.params.user == route.params.currentUser) ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
            <Pressable onPress={handleUpdateRating} style={{ paddingHorizontal: 15 }}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" color="steelblue" size={30} />
            </Pressable>
            <Pressable onPress={handleDeleteRating} style={{ paddingHorizontal: 15 }}>
              <FontAwesomeIcon icon="fa-solid fa-trash" color="steelblue" size={30} />
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 25,
    color: "grey",
    textAlign: "center"
  },
  userText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 25,
    color: "blue",
    textAlign: "center",
    textDecorationLine:'underline'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'steelblue',
    marginVertical:7,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  homeButton: {
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:2,
    marginBottom: 30
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});