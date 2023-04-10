import React from "react";
import { StyleSheet, TextInput, ImageBackground, View, Text, TouchableOpacity, Keyboard  } from "react-native";

// Object containing background color options
const backgroundColors = {
    black: { backgroundColor: "#090C08" },
    purple: { backgroundColor: "#474056" },
    grey: { backgroundColor: "#d8d1d8" },
    green: { backgroundColor: "#94ae89" },
};

export default class Start extends React.Component {

    // Set initial state with empty name, no selected background color, and box height at 44%    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            backgroundColor: "",
            boxHeight: "44%"
        }
    }

    // Add listeners for when keyboard appears and disappears
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    // Remove listeners when component is unmounted
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    // Change box height when keyboard appears
    _keyboardDidShow = () => {
        this.setState({ boxHeight: "60%" });
    }

    // Reset box height when keyboard disappears
    _keyboardDidHide = () => {
        this.setState({ boxHeight: "44%" });
    }

    // Function to update selected background color in state
    selectColor = (color) => {
        this.setState({backgroundColor: color});
    }

    render () {
        // Destructure the backgroundColors object
        const { black, purple, grey, green } = backgroundColors;
        return (
            <View style={styles.container}>
                <ImageBackground 
                    source={require("../assets/Background-Image.png")}
                    style={[styles.container, styles.image]}
                >
                    <Text style={styles.title}>Chat App!</Text>
                    <View style={[styles.box, { height: this.state.boxHeight }]}>
                        <TextInput
                            style={styles.inputBox}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            placeholder="Your Name"
                        />
                        <View style={styles.colorBox}>
                            <Text style={styles.colorText}>Choose background color:</Text>
                            <View style={styles.colorView}>
                                <View style={[
                                    styles.colorWrapper,
                                    this.state.backgroundColor === black.backgroundColor ? styles.colorSelected : {}
                                ]}>
                                    <TouchableOpacity
                                    style={[
                                        styles.color,
                                        black,
                                    ]}
                                    onPress={() => this.selectColor(black.backgroundColor)}
                                    />
                                </View>
                                
                                <View style={[
                                    styles.colorWrapper,
                                    this.state.backgroundColor === purple.backgroundColor ? styles.colorSelected : {}
                                ]}>
                                    <TouchableOpacity
                                    style={[
                                        styles.color,
                                        purple,
                                    ]}
                                    onPress={() => this.selectColor(purple.backgroundColor)}
                                    />
                                </View>
                                <View style={[
                                    styles.colorWrapper,
                                    this.state.backgroundColor === grey.backgroundColor ? styles.colorSelected : {}
                                ]}>
                                    <TouchableOpacity
                                    style={[
                                        styles.color,
                                        grey,
                                    ]}
                                    onPress={() => this.selectColor(grey.backgroundColor)}
                                    />
                                </View>
                                <View style={[
                                    styles.colorWrapper,
                                    this.state.backgroundColor === green.backgroundColor ? styles.colorSelected : {}
                                ]}>
                                    <TouchableOpacity
                                    style={[
                                        styles.color,
                                        green,
                                    ]}
                                    onPress={() => this.selectColor(green.backgroundColor)}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name, color: this.state.backgroundColor})}
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

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