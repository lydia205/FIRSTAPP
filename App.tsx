import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , Button, Image,SafeAreaView, ScrollView, Animated, ViewStyle, StyleProp,ImageSourcePropType} from 'react-native';
import React, { useState , useRef, useEffect, ReactNode} from 'react';
import {NavigationContainer}from '@react-navigation/native';
import {createNativeStackNavigator}from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RadioButton, shadow } from 'react-native-paper';


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
        const[selectedValue, setSelectedValue] = useState('0');
        const[ImageBlock, setImage]= useState<ImageSourcePropType | undefined>(undefined);

        return (

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20}}>
              Hello {NameGet} {SurnameGet} !</Text>
            <Text>please select a language:</Text>
            </View>

            <View style={styles.RadioContainer}>
              <View style={styles.radioGroupe}>
                <View style={styles.radioButton}>
                  <RadioButton.Android
                  value='1'
                  status={selectedValue == '1'? 'checked': 'unchecked'}

                    onPress={() => setSelectedValue ('1')}
                    color='#007BFF'
                    />
                    <Text style={styles.radiolabel}>React Native</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android
                  value='2'
                  status={selectedValue == '2'? 'checked': 'unchecked'}

                    onPress={() => setSelectedValue ('2')}
                    color='#ba97b3'
                    />
                    <Text style={styles.radiolabel}>Kotlin</Text>
                </View>
                <View style={styles.radioButton}>
                   <RadioButton.Android
                  value='3'
                  status={selectedValue == '3'? 'checked': 'unchecked'}

                    onPress={() => setSelectedValue ('3')}
                    color='#4f484e'
                    />
                    <Text style={styles.radiolabel}>HTML and CSS</Text>
                </View>
        
                </View>
              </View>

            
            <View style={{flex: 1}}>
                  <Text style={{fontWeight: "bold", flex:0, paddingTop:30,
                    justifyContent:'center', textAlign: 'center', alignItems:'center'
              
                  }}>
                  your chosen language:
                  </Text>
                  <Button title="Click !"
                  onPress={() =>{
                    switch(selectedValue){
                      case "1":
                        setImage (require('./_image/photo.jpg'));
                        break;
                        case "2":
                          setImage (require('./_image/photo.jpg'))
                          break;
                          case "3":
                            setImage(require('./_image/photo.jpg'));
                            break;
                            default:
                              setImage(undefined);
                    }
                  }}/>

               <View style={styles.container}>
                <Image source={ImageBlock} style={styles.viewImage}></Image>
                </View>   
          </View>
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
    fontSize :0,
  },

  red: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center'

  },
  
 RadioContainer: {
  flex: 0, 
  backgroundColor:'#F5F5F5',
  justifyContent: 'center',
  alignItems:'center',
  
 },
 radioGroupe:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-around',
  marginTop: 20,
  borderRadius:8,
  backgroundColor:'white',
  padding:16,
  elevation:4,
  shadowColor: '#000',
  shadowOffset: {
    width:0,
     height:2,
  },
  shadowOpacity:0.25,
  shadowRadius:3.84,
  
 },
 radioButton:{
  flexDirection:'row',
  alignItems:'center',
  
 },
 radiolabel:{
  marginLeft: 8,
  fontSize: 16,
  color:'#333'

 } ,
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },

  viewImage:{
    width:350,
    height:350,
    alignContent:'center'
  }

   
}
  
);
