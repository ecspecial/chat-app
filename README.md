# Chat App

This is a chat application designed to provide a seamless chatting experience for users. The app offers various features, including message exchange, image sharing, and location sharing. It is compatible with screen readers, making it accessible for users with visual impairments.

![Image of Chat App demo](./assets/chat-demo.png)

## Getting started

### Prerequisites

Install nodejs LTS version.

#### Setting up your database

- Sign in at Google Firebase
- Create a new project in test mode
- In there create a Firestore Database
- At 'Settings' -> 'General' -> 'Your apps' -> 'Firestore for Web' generate your configuration object.

### Installation

Clone the repository:

```shell
git clone https://github.com/ecspecial/chat-app.git
cd chat-app
```

In the `App.js` file replace the `firebaseConfig` variable with the configuration info from your own Firestore database:

```js
firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-authdomain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
});
```

then run the next commands:

```shell
npx expo install
npx expo start
```

Install the Expo Go App from [Apple Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&gl=DE) to test the project on your mobile device

Install [Android Studio](https://developer.android.com/studio) for Android Emulator or [Xcode](https://apps.apple.com/de/app/xcode/id497799835?mt=12) for ios Simulator to test the app

## Tech stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Google Firestore Database](https://firebase.google.com/)
- Google Firebase Authentication
- [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## Application features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat provides users with two additional communication features: sending images and location data.
- Data gets stored online and offline.