import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyAuen1sFRLKqiCVuZfGe6VDwAxyZY5oi1E",
    authDomain: "chat-app-b2606.firebaseapp.com",
    projectId: "chat-app-b2606",
    storageBucket: "chat-app-b2606.appspot.com",
    messagingSenderId: "831180501088",
    appId: "1:831180501088:web:d54ade269740f511d85305"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Start'
      >
      <Stack.Screen
        name='Start'
        component={Start}
      />
      <Stack.Screen
        name='Chat'
        component={Chat}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
