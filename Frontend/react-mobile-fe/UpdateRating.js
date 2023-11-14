import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import axios from 'axios';

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

  const updateRating = async () => {
    if (!updatedArtist || !updatedSong || !rating) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    try {
      // Make API call to update rating
      await axios.put(`http://172.21.219.9/index.php/rating/update?id=${id}`, {
        username: user,
        artist: updatedArtist,
        song: updatedSong,
        rating: parseInt(rating)
      });

      Alert.alert("Success", "Rating updated successfully");

      // Navigate back to the Home screen and trigger a refresh
      navigation.navigate("Home", { refresh: true });
    } catch (error) {
      Alert.alert("Error", "Failed to update rating");
      console.error(error);
    }
  };

  return (
    // Frontend view for update rating component
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
        <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>{"Welcome, " + user + "!"}</Text>
      <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop: 0 }}>
        Update Rating
      </Text>
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder="Artist"
        value={updatedArtist}
        onChangeText={setUpdatedArtist}
      />
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder="Song"
        value={updatedSong}
        onChangeText={setUpdatedSong}
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
        onPress={updateRating}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Update Rating</Text>
      </Pressable>
    </View>
  );
}