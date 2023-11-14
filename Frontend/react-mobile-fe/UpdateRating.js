import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; // Make sure you import FontAwesomeIcon



export default function UpdateRating({ navigation, route }) {

  const { user, id, song: initialSong, artist: initialArtist, rating: initialRating, currentUser } = route.params;

  const [updatedArtist, setUpdatedArtist] = useState(initialArtist);
  const [updatedSong, setUpdatedSong] = useState(initialSong);
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    // Set initial state when the component mounts
    setUpdatedArtist(initialArtist);
    setUpdatedSong(initialSong);
    setRating(initialRating);
  }, [initialArtist, initialSong, initialRating]);

  const updateRating = () => {
    if (!updatedArtist || !updatedSong || !rating) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    // Make API call to update rating
    axios.put(`http://172.21.219.9/index.php/rating/update?id=${id}`, {
      username: user,
      artist: updatedArtist,
      song: updatedSong,
      rating: rating
    })
    .then(response => {
      Alert.alert("Success", "Rating updated successfully");
      // Navigate back to the Home screen
      navigation.navigate("Home", { refresh: true });
    })
    .catch(error => {
      //console.error('API call error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert(error.response.data.error);
      } else {
        Alert.alert('An error occurred');
      }
    });
  };

  const changeStars = (index) => {
    setRating(index+1);
    stars(rating);
  };

  const stars = (rating) => {
    const max = 5;
    const stars = [];

    for(let i=0; i<max; i++) {
        if (i<rating) {
            stars[i] = <Pressable key={i} onPress={() => changeStars(i)}><FontAwesomeIcon key={i} icon="fa-solid fa-star" color="gold" size={25}/></Pressable>;
        }
        else {
            stars[i] = <Pressable key={i} onPress={() => changeStars(i)}><FontAwesomeIcon key={i} icon="fa-regular fa-star" color="gold" size={25}/></Pressable>;
        }
    }
    return <Text>{stars}</Text>;
  };

  return (
    // Frontend view for update rating component
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
      <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>{"Username: " + currentUser}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <View style={{alignItems:'flex-end'}}>
          <Pressable style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop: 0 }}>
          Update Rating
        </Text>
        <TextInput
          style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
          placeholder="Artist"
          value={updatedArtist}
          editable={false} // Make it unchangeable
        />
        <TextInput
          style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
          placeholder="Song"
          value={updatedSong}
          editable={false} // Make it unchangeable
        />
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
          }}>
          <Text style={styles.detailsText}>
            Rating:
          </Text>
          {stars(rating)}
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:30}}>
          <Pressable style={styles.button} onPress={updateRating}>
            <Text style={styles.text}>Update</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Details", {id: id, song: initialSong, artist: initialArtist, user: user, rating:initialRating, currentUser:user})}>
            <Text style={styles.text}>Cancel</Text>
          </Pressable>
        </View>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'steelblue',
    margin:5,
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
