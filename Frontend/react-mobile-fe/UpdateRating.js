import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function UpdateRating({ navigation, route }) {
  const { user, id, song: initialSong, artist: initialArtist, rating: initialRating, currentUser } = route.params;

  const [updatedArtist, setUpdatedArtist] = useState(initialArtist);
  const [updatedSong, setUpdatedSong] = useState(initialSong);
  const [rating, setRating] = useState(initialRating.toString());

  useEffect(() => {
    // Set initial state when the component mounts
    setUpdatedArtist(initialArtist);
    setUpdatedSong(initialSong);
    setRating(initialRating.toString());
  }, [initialArtist, initialSong, initialRating]);

  const updateRating = () => {
    if (!updatedArtist || !updatedSong || !rating) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    // Make API call to update rating
    axios.put(`http://172.21.44.203/index.php/rating/update?id=${id}`, {
      username: user,
      artist: updatedArtist,
      song: updatedSong,
      rating: parseInt(rating)
    })
    .then(response => {
      Alert.alert("Success", "Rating updated successfully");
      // Navigate back to the Home screen
      navigation.navigate("Home", { refresh: true });
    })
    .catch(error => {
      Alert.alert("Error", "Failed to update rating");
      console.error(error);
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
            stars[i] = <Pressable onPress={() => changeStars(i)}><FontAwesomeIcon key={i} icon="fa-solid fa-star" color="gold" size={25}/></Pressable>;
        }
        else {
            stars[i] = <Pressable onPress={() => changeStars(i)}><FontAwesomeIcon key={i} icon="fa-regular fa-star" color="gold" size={25}/></Pressable>;
        }
    }
    return <Text>{stars}</Text>;
  };

  return (
    // Frontend view for update rating component
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
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
      <Pressable
        style={{ backgroundColor: "steelblue", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginVertical: 5 }}
        onPress={updateRating}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Update Rating</Text>
      </Pressable>
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
    borderRadius: 4,
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