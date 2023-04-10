import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    // Set the navigation header title to the name passed through navigation props
    componentDidMount() {
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({title: name});
    }

    render() {
        // Destructure the name and color passed through navigation props
        const { name, color } = this.props.route.params;
        return (
            <View style={[styles.container, {backgroundColor: color}]}>
                <Text>Hello Chat!</Text>
            </View>
        );
    }
}

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})