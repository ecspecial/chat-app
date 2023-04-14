import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, ImageBackground, View, Text, TouchableOpacity, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

// Object containing background color options
const backgroundColors = {
    navy: { backgroundColor: "#161D27" },
    purple: { backgroundColor: "#474056" },
    grey: { backgroundColor: "#d8d1d8" },
    green: { backgroundColor: "#94ae89" },
};

const Start = ({ navigation }) => {

    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", {
                    userID: result.user.uid,
                    name,
                    color: backgroundColor
                })
            })
    };

    // Set initial state with empty name, no selected background color, and box height at 44%    
    const [name, setName] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");

     // Get height of device window
    const windowHeight = Dimensions.get("window").height;
    // Calculate height of colored box
    const boxHeight = windowHeight * 0.4;
   
    
    // Function to update selected background color in state
      const selectColor = (color) => {
        setBackgroundColor(color);
    };

    const { navy, purple, grey, green } = backgroundColors;
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <ImageBackground
                source={require("../assets/Background-Image.png")}
                style={[styles.container, styles.image]}
            >
                <Text style={styles.title}>Chat App!</Text>
                <View style={[styles.box, { height: boxHeight }]}>
                    <TextInput
                        style={styles.inputBox}
                        value={name}
                        onChangeText={setName}
                        placeholder="Your Name"
                    />
                    <View style={styles.colorBox}>
                        <Text style={styles.colorText}>Choose background color:</Text>
                        <View style={styles.colorView}>
                            {[navy, purple, grey, green].map((color) => (
                                <View
                                    key={color.backgroundColor}
                                    style={[
                                    styles.colorWrapper,
                                    backgroundColor === color.backgroundColor
                                    ? styles.colorSelected
                                    : {},
                                    ]}
                                >
                                <TouchableOpacity
                                    style={[styles.color, color]}
                                    onPress={() => selectColor(color.backgroundColor)}
                                />
                                </View>
                            ))}
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={signInUser}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
        </View>
        </TouchableWithoutFeedback>
    );
};


// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    image: {
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    box: {
        paddingVertical: 15,
        height: "44%",
        width: "88%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },

    inputBox: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 50,
        borderWidth: 1,
        borderRadius: 5,
        width: "88%",
        paddingLeft: 10,
        height: 50
    },

    colorBox: {
        width: "88%"
    },

    colorText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 100,
    },

    colorView: {
        flexDirection: "row",
        marginTop: 10
    },

    color: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    colorWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        marginRight: 15
    },

    colorSelected: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#757083",
    },

    button: {
        backgroundColor: "#757083",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 2,
        width: "88%",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        opacity: 100
    }
})

export default Start;