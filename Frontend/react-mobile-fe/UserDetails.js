import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert, Pressable } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function UserDetails({navigation, route}) {

  const [isLoading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);

  // returns ratings list for a given user
  useEffect(() => {

    // IMPORTANT!!! Replace IP address below with your own (xxx.xx.xx.xxx)
    axios.get(`http://172.21.44.203/index.php/rating/getUserRatings?user=${route.params.user}`)

    .then((response) => {
        setRatings(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  // if user hits home button
  const onSubmit = () => {
    setLoading(true);
    navigation.navigate("Home");
  }

    // turn ratings into stars
    const stars = (rating) => {
      const max = 5;
      const stars = [];
  
      for (let i = 0; i < max; i++) {
        if (i < rating) {
          stars[i] = <FontAwesomeIcon key={i} icon="fa-solid fa-star" color="gold" size={22} />;
        }
        else {
          stars[i] = <FontAwesomeIcon key={i} icon="fa-regular fa-star" color="gold" size={22} />;
        }
      }
      return <Text>{stars}</Text>;
    };

  return (
    <View style={{ flex: 1, padding: 12, marginTop:40  }}>
      {(route.params.currentUser!='empty' && route.params.currentUser!=null) ? (
      <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginTop: 0 }}>{"Username: " + route.params.currentUser}</Text>
      ): null}
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
            <Pressable style={styles.homeButton} onPress={onSubmit}>
              <Text style={styles.buttonText}>Home</Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 30, color: "grey", textAlign: "center", marginTop:10}}>
            {'@' + route.params.user + "'s Ratings List"}
          </Text>
          <FlatList
            style={{margin:12}}
            data={ratings}
            renderItem={({ item }) => (
              <TouchableOpacity 
                    key={item.id}
                    style={styles.button} 
                    onPress={() => navigation.navigate("Details", {id: item.id, song: item.song, artist: item.artist, user:item.username, rating:item.rating, currentUser:route.params.currentUser, onRatingDeleted: route.params.onRatingDeleted, onRatingUpdated: route.params.onRatingUpdated})}
                >
                <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                  <Text style={styles.songText}>{item.song}</Text>
                  <Text style={styles.artistText}>{"  by " + item.artist}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginTop:10 }}>
                  <Text>{stars(item.rating)}</Text>
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
  homeButton: {
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:2
  }
});