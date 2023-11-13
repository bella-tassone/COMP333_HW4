import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import axios from 'axios';

export default function AddRating({ navigation, route }) {
  // Use the 'route' parameter to get the 'user' prop
  const user = route.params.user;

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [rating, setRating] = useState("");

  const addRating = () => {
    // Validate input fields
    if (!artist || !song || !rating) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    // Make API call to create rating
    axios.post('http://172.21.219.9/index.php/rating/create', {
      username: user,
      artist,
      song,
      rating: parseInt(rating)
    })
    .then(response => {
      Alert.alert("Success", "Rating added successfully");
      navigation.goBack();
    })
    .catch(error => {
      Alert.alert("Error", "Failed to add rating");
      console.error(error);
    });
  };

  return (
    // Frontend view for add rating component
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
      <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop: 0 }}>
        Add Rating
      </Text>
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder="Song"
        value={song}
        onChangeText={setSong}
      />
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <Pressable
        style={{ backgroundColor: "steelblue", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginVertical: 5 }}
        onPress={addRating}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Add Rating</Text>
      </Pressable>
    </View>
  );
}