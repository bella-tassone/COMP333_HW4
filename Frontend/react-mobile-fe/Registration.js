
import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Alert, TextInput } from "react-native";
import axios from 'axios';

export default function Registration({navigation}) {

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    // when submit button is clicked
    const handleSubmit = async () => {

        try {
            const response = await axios.post('http://129.133.188.164/index.php/user/create', 
            {username:username, password1:password1, password2:password2});
            
            if (response.status === 200) {
            Alert.alert('Registration successful!');
            //localStorage.setItem('username', inputs.username);
            navigation.navigate("Home");
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
    <View style={{ flex: 1, padding: 12 }}>
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
            marginTop: 50
        }}
        >
        <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginBottom:20}}>
            Create your account!
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
            onChangeText={(text) => setPassword1(text)}
            value={password1}
            placeholder="Password"
            secureTextEntry={true}
            />
            <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword2(text)}
            value={password2}
            placeholder="Re-enter Password"
            secureTextEntry={true}
            />
        </View>
        <View style={{alignItems:'center'}}>
            <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
        <View style={{alignItems:'center', marginTop:10}}>
            <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{textDecorationLine:'underline', color:'blue'}}>Already have an account? Login here!</Text>
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