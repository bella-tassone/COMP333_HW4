import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert, Pressable, TextInput } from "react-native";
import axios from 'axios';

export default function Home({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    axios.get(`http://129.133.188.164/index.php/rating/get?limit=100`)
    .then((response) => {
        setRatings(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  const clearAndSubmit = () => {
    setSearch("");
    navigation.navigate("Search Results", {search:search});
  }

  return (
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
            justifyContent: "space-evenly"
          }}
        >
          <View style={{alignItems:'flex-end'}}>
            <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
          <View style={{flex:1, flexDirection:'row', justifyContent:'center', marginTop:20, alignItems:'center'}}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSearch(text)}
              value={search}
              placeholder="Filter by username"
            />
            <Pressable style={styles.searchButton} onPress={clearAndSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop:0}}>
            Ratings List
          </Text>
          <FlatList
            // We use various props of the built-in FlatList component.
            // data refers to our data; it is an array [ ].
            // The key from the data array is extracted using the keyExtractor
            // prop on the FlatList component.
            // renderItem takes an item from the data and renders it on a list.
            style={{margin:12}}
            data={ratings}
            renderItem={({ item }) => (
              <TouchableOpacity 
                    key={item.id}
                    style={styles.button} 
                    onPress={() => navigation.navigate("Details", {id: item.id, song: item.song, artist: item.artist, user:item.username, rating:item.rating})}
                >
                <View style={{flexDirection: 'row', justifyContent: "flex-start", alignItems: "center"}}>
                  <Text style={styles.songText}>{item.song}</Text>
                  <Text style={styles.artistText}>{"  by " + item.artist}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={{alignItems:'center'}}>
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
  songText: {
    color: "#fff",
    fontSize: 20,
    fontWeight:'bold'
  },
  artistText: {
    color: "#fff",
    fontSize: 20,
    opacity: 0.5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
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
    marginVertical:2,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor:"grey",
    padding: 10,
    width:250
  },
  searchButton: {
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginVertical:5,
    height:42,
  },
});