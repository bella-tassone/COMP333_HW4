
import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Alert, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogOut({navigation, route}) {

  const onChange = route.params.onChange;

  // when submit button is clicked
  const handleLogOut = async () => {
    try {
      await AsyncStorage.setItem('username', 'empty');
      onChange();
      navigation.navigate("Home");
    } catch (error) {
      console.error('API call error:', error);
    };
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          marginBottom:150
        }}
      >
        <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginBottom:20, marginHorizontal:10}}>
          Are you sure that you want to log out?
        </Text>
        <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
          <Pressable style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Cancel</Text>
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
    marginVertical:5,
    marginHorizontal:5
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