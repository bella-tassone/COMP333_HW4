import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert, Pressable } from "react-native";
import axios from 'axios';

export default function SearchResults({navigation, route}) {

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get(`http://129.133.188.164/index.php/user/get?search=${route.params.search}`)
    .then((response) => {
        setUsers(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

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
            justifyContent: "space-between"
          }}
        >
          <View style={{alignItems:'flex-end'}}>
            <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.buttonText}>Home</Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop:10}}>
            {"Search results for '" + route.params.search + "'"}
          </Text>
          <FlatList
            style={{margin:12}}
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity 
                    key={item.username}
                    style={styles.button} 
                    onPress={() => navigation.navigate("User Details", {user: item.username})}
                >
                <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                  <Text style={styles.userText}>{'@' + item.username}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
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
  userText: {
    color: "#fff",
    fontSize: 20,
    fontWeight:'bold'
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
    marginVertical:2
  }
});