import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert, Pressable, TextInput } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState('');
  const [userChange, setUserChange] = useState(false);

  const refreshUser = () => {
    setUserChange(!userChange);
  };

  const refreshRatings = () => {
    axios.get(`http://172.21.219.9/index.php/rating/get?limit=100`)
      .then((response) => {
        setRatings(response.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      refreshRatings();
    }, [userChange])
  );

  useEffect(() => {
    AsyncStorage.getItem('username')
      .then((value) => {
        if (value) {
          setUser(value);
          console.log('User retrieved:', value);
        }
      })
      .catch((e) => {
        console.error('API call error:', e);
      });
  }, [userChange]);

  const clearAndSubmit = () => {
    setSearch("");
    navigation.navigate("Search Results", { search: search });
  };

  return (
    <View style={{ flex: 1, padding: 12, marginTop: 40 }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-evenly"
          }}
        >
          {(user !== 'empty' && user != null) ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>{"Welcome, " + user + "!"}</Text>
              <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Log Out", { onChange: refreshUser })}>
                <Text style={styles.buttonText}>Log Out</Text>
              </Pressable>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>Welcome!</Text>
              <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Login", { onChange: refreshUser })}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </View>
          )}
          <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center' }}>
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
          <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop: 0 }}>
            Ratings List
          </Text>
          <FlatList
            style={{ margin: 12 }}
            data={ratings}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={styles.button}
                onPress={() => navigation.navigate("Details", { id: item.id, song: item.song, artist: item.artist, user: item.username, rating: item.rating, currentUser: user })}
              >
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>
                  <Text style={styles.songText}>{item.song}</Text>
                  <Text style={styles.artistText}>{"  by " + item.artist}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {(user !== 'empty' && user != null) ? (
  <View style={{ alignItems: 'center' }}>
    <Pressable style={styles.addRatingButton}
        onPress={() => navigation.navigate("AddRating", {
        user,
        onRatingAdded: () => refreshRatings(), // Provide a default callback to refresh ratings
      })}
    >
      <Text style={styles.buttonText}>Add Song</Text>
    </Pressable>
  </View>
) : null}
        </View>
      )}
    </View>
  );
}


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