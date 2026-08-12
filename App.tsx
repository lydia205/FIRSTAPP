import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , Button, Image,SafeAreaView, ScrollView, Animated, ViewStyle, StyleProp} from 'react-native';
import React, { useState , useRef, useEffect, ReactNode} from 'react';
import {NavigationContainer}from '@react-navigation/native';
import {createNativeStackNavigator}from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


function isEmpty(Value: any){
          return(
            (Value == null) ||
            (Value.hasOwnProperty('length')&& Value.length === 0) ||
            (Value.constructor === Object && Object.keys(Value).length === 0)
          )
        }
type RootStackParamlist = {
  Home: undefined;
  ViewDetails:{
    FirstNameSend: string;
    SurnameSend: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamlist>();

type MainScreenProps = NativeStackScreenProps<
   RootStackParamlist,
   'Home'
   >;

   type ViewDetailsProps = NativeStackScreenProps<
     RootStackParamlist,
     'ViewDetails'

     >;

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Home" component = {MainScreen}/>
        <Stack.Screen name='ViewDetails'component={ViewDetails}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen ({navigation} :MainScreenProps){

  const [ FirstName, setFirstName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Error, setError] = useState(false);

  console.log("App is running !!!")

  const handleFirstNameChange = (text: string) => {
      const textOnly = text.replace(/[^a-zA-Z\s]/g, '');
      setFirstName(textOnly);
  };

  const handleSurnameChange = (text: string) => {
      const textOnly = text.replace(/[^a-zA-Z\s]/g, '');
      setSurname(textOnly);
  };

  

  return (
    
      <View style={{ flex:  1}}>
        <SafeAreaView style={{ flex: 1}}>
          <ScrollView>

      <Image style={styles.mainImage} source={require('./_image/photo.jpg')}/>
      <Text style={styles.welcomeTxt}> welcome to my App </Text>

    <FadeInView>
      <Text style={Error? styles.errorRed : styles.blank}>
        {Error? "please fill in all fields!" : ""}
      </Text>

      <View style={styles.inputFlex}>
       <Text style={styles.enterTxt}>Enter your name :</Text>
       < TextInput style={styles.userInputTxt} placeholder = "FirstName"
       value={FirstName}
       onChangeText={handleFirstNameChange}
       autoCapitalize= "words"
       autoComplete= "given-name"/>
      </View>

      <View style={styles.inputFlex}>
        <Text style={styles.enterTxt}>Enter your Surname:</Text>
        <TextInput placeholder = "Surname" 
       value= {Surname}
       onChangeText={handleSurnameChange}
       autoCapitalize= "words"
       autoComplete= "family-name"/>
      </View>
     </FadeInView>

      <Button title="Add User"
        onPress= {() => {
        if ((isEmpty(FirstName) ==false) && (isEmpty(Surname)==false)){
          navigation.navigate ('ViewDetails', {
            FirstNameSend: FirstName,
           SurnameSend: Surname
          });
          setError(false)
        } else {
          setError(true)
        }

        }}/>
       

      <StatusBar style="auto" />
      </ScrollView>
      </SafeAreaView>

       </View>
    
    );
  }

      function ViewDetails({navigation,route}: ViewDetailsProps) {

        const NameGet= route.params.FirstNameSend;
        const SurnameGet= route.params.SurnameSend;

        return (

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Name: {NameGet} Surname: {SurnameGet}</Text>
         </View>   
        );
      
      }
      

      interface FadeInviewProps{
        children: ReactNode;
        style?: StyleProp<ViewStyle>;
      }

      interface viewDetailsProps{navigation: any;
        route:{
        params:{
          FirstNameSend: String;
          SurnameSend: String
        };
        };
      }

      const FadeInView: React.FC<FadeInviewProps> = (props)=> {
        const fadeAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }).start();
        }, [fadeAnim]);

        return (
          <Animated.View style={[props.style, {opacity: fadeAnim}]}>
            {props.children}
            </Animated.View>
    

        );
      };

      

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
    borderBottomWidth: 1,
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
  
  },

  errorRed: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30 ,
    textAlign: 'center'
  }, 
  blank: {
  
  }
  
});
