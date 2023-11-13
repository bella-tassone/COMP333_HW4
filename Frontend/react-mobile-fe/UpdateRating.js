import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import axios from 'axios';

export default function UpdateRating({ navigation, route }) {
  // Use the 'route' parameter to get the 'user' prop
  const user = route.params.user;
  const idToUpdate = route.params.id;

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [rating, setRating] = useState(route.params.rating?.toString() || "");

  useEffect(() => {
    // Set initial state when the component mounts
    if (route.params.artist) {
      setArtist(route.params.artist);
    }

    if (route.params.song) {
      setSong(route.params.song);
    }

    setRating(route.params.rating?.toString() || "");
  }, [route.params.artist, route.params.song, route.params.rating]);

  const updateRating = () => {
    if (!artist || !song || !rating) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    // Make API call to update rating
    axios.post(`http://172.21.219.9/index.php/rating/update?id=${idToUpdate}`, {
      username: user,
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
  
  return (
    // Frontend view for update rating component
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
      <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop: 0 }}>
        Update Rating
      </Text>
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder={artist} // Set placeholder to the artist value
        defaultValue={artist}
        editable={false} // Make it unchangeable
      />
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder={song} // Set placeholder to the song value
        defaultValue={song}
        editable={false} // Make it unchangeable
      />
      <TextInput
        style={{ height: 40, margin: 10, borderWidth: 1, borderColor: "grey", padding: 10 }}
        placeholder="Rating (1-5)"
        defaultValue={rating}
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