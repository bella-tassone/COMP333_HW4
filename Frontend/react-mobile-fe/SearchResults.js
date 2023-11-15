import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert, Pressable } from "react-native";
import axios from 'axios';

export default function SearchResults({navigation, route}) {

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  
  // processes request, returns list of users who match search query
  useEffect(() => {

    // IMPORTANT!!! Replace IP address below with your own (xxx.xx.xx.xxx)
    axios.get(`http://172.21.44.203/index.php/user/get?search=${route.params.search}`)

    .then((response) => {
        setUsers(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  // if user selects home button
  const onSubmit = () => {
    setLoading(true);
    navigation.navigate("Home");
  }

  return (
    <View style={{ flex: 1, padding: 12, marginTop:40  }}>
      {(route.params.currentUser!='empty' && route.params.currentUser!=null) ? (
      <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>{"Username: " + route.params.currentUser}</Text>
      ): null}
      {/* As long as isLoading is true, show "Loading ..." */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        // Once it is false, show the fetched data.
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <View style={{alignItems:'flex-end'}}>
            <Pressable style={styles.loginButton} onPress={onSubmit}>
              <Text style={styles.buttonText}>Home</Text>
            </Pressable>
          </View>
          {(route.params.search == '') ? (
            <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop:10, textDecorationLine:'underline'}}>
                {"Showing all users:"}
            </Text>
          ) : (
            <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop:10, textDecorationLine:'underline'}}>
                {"Search results for '" + route.params.search + "':"}
            </Text>
          )}
          {(Object.keys(users).length != 0) ? (
            <FlatList
                style={{margin:12}}
                data={users}
                renderItem={({ item }) => (
                <TouchableOpacity 
                        key={item.username}
                        style={styles.button} 
                        onPress={() => navigation.navigate("User Details", {user: item.username, currentUser:route.params.currentUser, onRatingDeleted: route.params.onRatingDeleted, onRatingUpdated: route.params.onRatingUpdated})}
                    >
                    <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.userText}>{'@' + item.username}</Text>
                    </View>
                </TouchableOpacity>
                )}
            />
            ) : (
            <Text style={{textAlign:'center', marginTop:20, fontSize:20, color:'grey'}}>No results found.</Text>
          )}
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