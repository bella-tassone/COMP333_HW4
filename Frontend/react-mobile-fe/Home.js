import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert, Pressable } from "react-native";
import axios from 'axios';

export default function Home({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  
  useEffect(() => {
    axios.get(`http://129.133.188.164/index.php/rating/get?limit=100`)
    .then((response) => {
        setRatings(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    // Now the component parses the data and renders it using a FlatList component.
    <View style={{ flex: 1, padding: 12 }}>
      {/* As long as isLoading is true, show "Loading ..." */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        // Once it is false, show the fetched data.
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <View style={{alignItems:'flex-end'}}>
            <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop:10}}>
            Ratings List
          </Text>
          <FlatList
            // We use various props of the built-in FlatList component.
            // data refers to our data; it is an array [ ].
            // The key from the data array is extracted using the keyExtractor
            // prop on the FlatList component.
            // renderItem takes an item from the data and renders it on a list.
            style={{padding:12}}
            data={ratings}
            renderItem={({ item }) => (
              <TouchableOpacity 
                    key={item.id}
                    style={styles.button} 
                    onPress={() => navigation.navigate("Details", {id: item.id, song: item.song, artist: item.artist, user:item.username, rating:item.rating})}
                >
                <Text style={styles.buttonText}>{item.song + " by " + item.artist}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={{alignItems:'center', marginTop:10}}>
            <Pressable style={styles.addRatingButton} onPress={() => Alert.alert("Simple Button pressed")}>
              <Text style={styles.buttonText}>Add Song</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  addRatingButton: {
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:5
  },
  loginButton: {
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:2
  }
});