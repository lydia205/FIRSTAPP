import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , Button} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text> welcome to my App </Text>
      <Text> Enter your name </Text>
      <TextInput placeholder = "FirstName"/> 
      <Button title="Add User"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
