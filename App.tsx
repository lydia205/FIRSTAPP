import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , Button, Image} from 'react-native';

export default function App() {
  return (
    <View>
      <Image style={styles.mainImage} source={require('./_image/photo.jpg')}/>
      <Text style= {styles.welcomeTxt}> welcome to my App </Text>

      <View style={styles.inputFlex}>
       <Text style={ styles.enterTxt}>Enter your name :</Text>
       < TextInput style={styles.userInputTxt} placeholder = "FirstName"/> 
      </View>
      <View style={styles.inputFlex}>
       <Text style={styles.enterTxt}>Enter your Surname:</Text>
       <TextInput placeholder = "Surname" />
      </View>
      <Button title="Add User"/>
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
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },

  userInputTxt: {
    borderBottomWidth: 1
  },

  mainImage:{
    height: 500,
    width: 500,
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
