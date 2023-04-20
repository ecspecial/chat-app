import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { async } from "@firebase/util";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL  } from "@firebase/storage";


// Define the CustomActions component
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID  }) => {

    const actionSheet = useActionSheet();

    // Function to generate image referense to upload to firebase storage
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
    }

    // Function to convert image to blob
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref);
            onSend({image: imageURL})
        })

    }

    // Allow picking image from device library
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
          let result = await ImagePicker.launchImageLibraryAsync();
          if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
          else Alert.alert("Permissions haven't been granted.");
        }
      }
      
    // Function to allow taking photo using device camera
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }

    // Function to allow sending device location
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
    }

    // Define additional actions to chose from chat component
    const onActionPress = () => {
        const options = ["Choose From Library", "Take Picture", "Send Location", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                  case 0:
                    pickImage();
                    return;
                  case 1:
                    takePhoto();
                    return;
                  case 2:
                    getLocation();
                  default:
                }
            },
        );
    };

    // Render "+" button to expand additional chat options
    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    )
}

// Add styling to "+" button
const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: "#b2b2b2",
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: "#b2b2b2",
      fontWeight: "bold",
      fontSize: 15,
      backgroundColor: "transparent",
      textAlign: "center",
      textAlignVertical: "center",
    },
  });

// Export component
export default CustomActions;