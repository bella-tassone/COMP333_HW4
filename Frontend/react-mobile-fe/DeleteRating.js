import React, { useEffect } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import axios from 'axios';

export default function DeleteRating({ navigation, route }) {
  const idToDelete = route.params.id;
  const user = route.params.user;

  useEffect(() => {
    axios.delete(`http://172.21.219.9/index.php/rating/delete?id=${idToDelete}`, {
      data: { username: user }
    })
    .then(response => {
      Alert.alert("Success", "Rating deleted successfully");
      const onRatingDeleted = route.params.onRatingDeleted;
      if (onRatingDeleted) {
        onRatingDeleted(idToDelete);
      }
      navigation.navigate("Home"); // Navigate back to Home after deleting
    })
    .catch(error => {
      Alert.alert("Error", "Failed to delete rating");
      console.error(error);
    });
  }, [idToDelete, user, route.params.onRatingDeleted, navigation]);

  return (
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
      <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop: 0 }}>
        Deleting Rating...
      </Text>
    </View>
  );
}