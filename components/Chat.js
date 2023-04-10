import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

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
    ]);

    // Set the navigation header title to the name passed through navigation props
    const { name } = route.params;
    navigation.setOptions({ title: name });
  }, [route, navigation]);

  const onSend = (message) => {
    setMessages((previousState) => GiftedChat.append(previousState, message));
  };

  // Destructure the name and color passed through navigation props
  const { name, color } = route.params;

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(message) => onSend(message)}
        user={{
          _id: 1,
        }}
      />
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