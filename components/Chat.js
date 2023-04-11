import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat, SystemMessage, Time, Day } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, Developer!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);

    // Set the navigation header title to the name passed through navigation props
    const { name } = route.params;
    navigation.setOptions({ title: name });
  }, [route, navigation]);

  const onSend = (message) => {
    setMessages((previousState) => GiftedChat.append(previousState, message));
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
    <View style={[styles.container, { backgroundColor: color }]}>
        <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderSystemMessage={renderSystemMessage}
            renderTime={renderTime}
            renderDay={renderDay}
            onSend={(message) => onSend(message)}
            user={{
                _id: 1,
            }}
        />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;