import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Bubble, GiftedChat, SystemMessage, Time, Day } from "react-native-gifted-chat";
import { query, onSnapshot, collection, where, orderBy, addDoc } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const { userID } = route.params;
    const [messages, setMessages] = useState([]);

  useEffect(() => {

    // Set the navigation header title to the name passed through navigation props
    const { name } = route.params;
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
            newMessages.push({ 
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.toMillis()),
                });
        });
        setMessages(newMessages);
    });

    return () => {
        if (unsubMessages) {unsubMessages()};
    }
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

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

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: "#FFF",
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

  // Destructure the name and color passed through navigation props
  const { name, color } = route.params;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.container, { backgroundColor: color }]}>
        <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderSystemMessage={renderSystemMessage}
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