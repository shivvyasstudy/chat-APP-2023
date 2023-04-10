import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';


const Stack = createNativeStackNavigator();

const globalScreenOptions ={
    headerStyle:{backgroundColor: "#FCFDF2" },
    headerTitleStyle: {color: "#222222"},
    headerTintColor: {color: "#222222"},

    
}


export default function App() {
  return (
       <NavigationContainer>
            <Stack.Navigator 
            // initialRouteName='Chat'
            // initialRouteName= "Home"
             screenOptions = {globalScreenOptions}>
            <Stack.Screen name = "Login" component = {LoginScreen}/>
            <Stack.Screen name = "Register" component = {RegisterScreen}/>
            <Stack.Screen name = "Home" component = {HomeScreen}/> 
            <Stack.Screen name = "AddChat" component = {AddChatScreen}/> 
            <Stack.Screen name = "Chat" component = {ChatScreen}/> 




          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});