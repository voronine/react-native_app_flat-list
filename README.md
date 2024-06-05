# Star Wars Favorites Mobile Application

## Overview

This project is a mobile application built with React Native (using React Native Init/CLI, not Expo) for both iOS and Android platforms. The application allows users to track and manage their favorite characters from the Star Wars universe. Users can view a list of characters, add characters to their favorites, and see the total count of male, female, and other characters they have favorited. The app also includes a reset button to clear all favorite selections and reset the totals.

## Features

1. **API Integration**: Fetches data from the Star Wars API (SWAPI) to retrieve character information.
2. **Character List**: Displays a scrollable and paginated list of Star Wars characters.
3. **Character Details**: Allows users to click on a character to view more details on a dedicated screen.
4. **Favorites Management**: Users can add characters to their favorites, which updates the total count of male, female, and other characters.
5. **Reset Functionality**: A reset button to clear all favorite selections and reset the totals to zero.

## Technologies and Libraries

- **React Native**: Framework for building native apps using React.
- **Axios**: Library for making HTTP requests.
- **React Navigation**: Library for handling navigation in the app.
- **Context API**: Used for state management.
- **Prettier**: Code formatter.
- **ESLint**: Linter for identifying and fixing code issues.
- **SWAPI**: Star Wars API for fetching character data.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **React Native CLI**: Install the React Native CLI globally. You can do this by running `npm install -g react-native-cli`.

![App Screenshot](https://github.com/voronine/react-native_app_flat-list/blob/main/src/assets/image/screenshot.png)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/voronine/react-native_app_flat-list
    cd react-native_app_flat-list
    ```

2. Install the dependencies:
    ```sh
    npm i
    ```

### Running the App

#### iOS

1. Install the required CocoaPods dependencies:
    ```sh
    cd ios
    pod install
    cd ..
    ```

2. Run the app on an iOS simulator:
    ```sh
    npx react-native run-ios
    ```

#### Android

1. Start the Android emulator or connect an Android device.
2. Run the app on an Android device/emulator:
    ```sh
    npx react-native run-android
    ```

## Project Structure

- **src/**: Contains the main source code for the application.
  - **components/**: Reusable components.
  - **context/**: Context providers for state management.
  - **screens/**: Screen components.
  - **services/**: API services.
  - **utils/**: Utility functions and constants.

## Code Quality

This project uses ESLint and Prettier to maintain code quality and consistency.

## API

The application uses the [Star Wars API (SWAPI)](https://swapi.py4e.com/) to fetch character data.

## References

- [Application Reference](https://sw-app-gilt.vercel.app/)


Feel free to customize the README further based on your specific requirements and preferences.
