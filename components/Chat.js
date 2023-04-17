import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Bubble, GiftedChat, SystemMessage, Time, Day, InputToolbar } from "react-native-gifted-chat";
import { query, onSnapshot, collection, where, orderBy, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the Chat component
const Chat = ({ route, navigation, db, isConnected }) => {
    
    // Extract the userID from route.params
    const { userID } = route.params;

    // Define state variable for messages
    const [messages, setMessages] = useState([]);

    // Define a function to cache messages in AsyncStorage
    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("cached_messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    // Define a function to load cached messages from AsyncStorage
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("cached_messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    // Define a variable to store the message subscription
    let unsubMessages;

    // Run the effect whenever isConnected changes
    useEffect(() => {

        // Set the navigation header title to the name passed through navigation props
        const { name } = route.params;
        navigation.setOptions({ title: name });

        // If connected to Firestore, subscribe to message collection and update state
        if (isConnected === true) {

            // Unsubscribe from previous message subscription
            if (unsubMessages) unsubMessages();
            unsubMessages === null;

            // Set up the query and snapshot listener
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({ 
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    });
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
        });
        } else {
            // If not connected, load cached messages
            loadCachedMessages();
        }

        // Clean up the effect by unsubscribing from the message subscription
        return () => {
            if (unsubMessages) {unsubMessages()};
        }
    }, [isConnected]);

    // Define a function to handle sending new messages to Firestore
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    // Define functions to customize the appearance of components in GiftedChat
    
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: "#FFF",
                    },
                    left: {
                        color: "#FFF",
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#3F6188",
                    },
                    left: {
                        backgroundColor: "#222E3A",
                    },
                }}
            />
        );
    };

    const renderTime = (props) => (
        <Time
            {...props}
            timeTextStyle={{
                left: {
                    color: "#FFF",
                },
                right: {
                    color: "#FFF",
                },
            }}
        />
    );

    const renderDay = (props) => {
        return (
            <Day
                {...props}
                textStyle={{
                    color: "#FFF",
                }}
            />
        );
     };

    const renderInputToolbar = (props) => {
        if (isConnected === true) return <InputToolbar {...props} />;
        else return null
    }

    // Destructure the name and color passed through navigation props
    const { name, color } = route.params;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderTime={renderTime}
                renderDay={renderDay}
                onSend={(message) => onSend(message)}
                user={{
                    _id: userID,
                    name
                }}
            />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
        </TouchableWithoutFeedback>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;