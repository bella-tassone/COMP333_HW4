
import React, { useEffect, useState } from "react";
// FlatList renders items lazily, when they are about to appear, and removes
// items that scroll way off screen to save memory and processing time.
import { Text, View, Pressable, StyleSheet, Alert, TextInput } from "react-native";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Registration({navigation}) {

  const [username, onChangeUsername] = React.useState('');
  const [password1, onChangePassword1] = React.useState('');
  const [password2, onChangePassword2] = React.useState('');


  useEffect(() => {
    axios.get(`http://129.133.188.164/index.php/rating/get?limit=100`)
    .then((response) => {
        setRating(response.data);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 175
      }}
    >
      <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginBottom:20}}>
        Create your account!
      </Text>
      <View style={{alignItems:'center'}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword1}
          value={password1}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword2}
          value={password2}
          placeholder="Re-enter Password"
          secureTextEntry={true}
        />
      </View>
      <View style={{alignItems:'center'}}>
        <Pressable style={styles.button} onPress={() => Alert.alert("heyyy")}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
      <View style={{alignItems:'center', marginTop:10}}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={{textDecorationLine:'underline', color:'blue'}}>Already have an account? Login here!</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor:"grey",
    padding: 10,
    width:300
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
  }
});