
import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Alert, TextInput } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation, route}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = route.params.onChange;

  // when submit button is clicked
  const handleSubmit = async () => {

    try {
      // Assuming your API expects query parameters for a GET request

      const response = await axios.get('http://172.21.219.9/index.php/user/login', {
       params: {username: username, password: password}
      });
      if (response.status === 200) {
        await AsyncStorage.setItem('username', username);
        setUsername('');
        setPassword('');
        onChange();
        Alert.alert('Login successful!');
        navigation.navigate("Home");

      } else {
        Alert.alert('Login failed. Please try again.');
      }
    } catch (error) {
      //console.error('API call error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert(error.response.data.error);
      } else {
        Alert.alert('An error occurred');
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 12, marginTop:40  }}>
      <View style={{alignItems:'flex-end'}}>
        <Pressable style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop:50
        }}
      >
        <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginBottom:20}}>
          Login to your account!
        </Text>
        <View style={{alignItems:'center'}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View style={{alignItems:'center'}}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
        <View style={{alignItems:'center', marginTop:10}}>
          <Pressable onPress={() => navigation.navigate("Registration", {onChange: onChange})}>
            <Text style={{textDecorationLine:'underline', color:'blue'}}>Don't have an account? Register here!</Text>
          </Pressable>
        </View>
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
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: "steelblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical:2
  }
});