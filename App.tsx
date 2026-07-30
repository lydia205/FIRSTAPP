import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , Button, Image} from 'react-native';
import React, { useState } from 'react';
import {NavigationContainer}from '@react-navigation/native';
import {createNativeStackNavigator}from '@react-navigation/native-stack';


export default function App() {

  const [ FirstName, setFirstName] = useState("");
  const [Surname, setSurname] = useState("");

  console.log("App is running !!!")

  const handleFirstNameChange = (text: string) => {
      const textOnly = text.replace(/[^a-zA-Z\s]/g, '');
      setFirstName(textOnly);
  };

  const handleSurnameChange = (text: string) => {
      const textOnly = text.replace(/[^a-zA-Z\s]/g, '');
  };


  return (
    <View>
      <Image style={styles.mainImage} source={require('./_image/photo.jpg')}/>
      <Text style= {styles.welcomeTxt}> welcome to my App </Text>

      <View style={styles.inputFlex}>
       <Text style={ styles.enterTxt}>Enter your name :</Text>
       < TextInput style={styles.userInputTxt} placeholder = "FirstName" 
       onChangeText={newText => setFirstName(newText)}
       autoCapitalize= "words"
       autoComplete= "given-name"/>
      </View>
      <View style={styles.inputFlex}>
       <Text style={styles.enterTxt}>Enter your Surname:</Text>
       <TextInput placeholder = "Surname" 
       value= {Surname}
       onChangeText={newText => setSurname(newText)}
       autoCapitalize= "words"
       autoComplete= "family-name"/>
      </View>
      <Button title="Add User"

        onPress= {() =>  {
          console.log("FirstName:" + FirstName + "Surname:" + Surname)
        }}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeTxt: {
    paddingTop: 50,
    color: "pink",
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: "center"
  },

  enterTxt: {
    fontWeight: "bold",
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },

  userInputTxt: {
    borderBottomWidth: 1
  },

  mainImage:{
    height: 350,
    width: 350,
    paddingTop: 25,
    justifyContent: "center",
    alignItems: "center"
  },

  inputFlex:{
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-evenly"
  }
});
