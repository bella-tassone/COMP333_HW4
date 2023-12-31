import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; // Make sure you import FontAwesomeIcon


export default function AddRating({ navigation, route }) {
  
  // Use the 'route' parameter to get the 'user' prop
  const user = route.params.user;
  const onRatingAdded = route.params.onRatingAdded || (() => {});

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [rating, setRating] = useState(0);

  // function runs when user submits request
  const addRating = () => {
    if (!artist || !song || !rating) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    // Make API call to create rating
    // IMPORTANT!!! Replace IP address below with your own (xxx.xx.xx.xxx)
    axios.post('http:/172.21.44.203/index.php/rating/create', {
      username: user,
      artist: artist,
      song: song,
      rating: rating
    })
    .then(response => {
      Alert.alert("Success", "Rating added successfully");
      onRatingAdded();
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

  // sets rating and changes star UI based on star amount that user presses
  const changeStars = (index) => {
    setRating(index+1);
    stars(rating);
  };

  // renders stars in place of numerical rating
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
    // Frontend view for add rating component
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
      <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>{"Username: " + user}</Text>
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
          <Pressable style={styles.button} onPress={addRating}>
            <Text style={styles.text}>Add Rating</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
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
