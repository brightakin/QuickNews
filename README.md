## Setup

Created a GitHub repository named quicknews.

Cloned the repository to my local machine.

Initialize React Native Project with the following command: npx react-native init quicknews --template react-native-template-typescript

Install the required dependencies with the following command:
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs redux react-redux @reduxjs/toolkit axios react-native-code-push

Created Firebase Project: Create a Firebase project named quicknews.

Add Firebase to Project:

Downloaded the google-services.json file and place it in the android/app directory.
Downloaded the GoogleService-Info.plist file and add it to the iOS project in Xcode.
Added dependencies to the native applications(android and ios)
API Integration

RapidAPI - Free News API was asking for a subscription so I opted for a free substitute
Sign Up: Sign up for an account on the new api platform.
Fetch News Data:
Used Axios to retrieve news data from the API.

## Application Structure

Redux Setup
State Management: Used Redux Toolkit for managing application state.

## Features Implementation

User Authentication
Sign Up and Login Screens:
Protect News Routes: Ensured news listing and details can only be accessed by authenticated users.
News Listing and Details Screens
News Listing:
Fetch news articles from the Free News API.
Display title, image, topic, and publication date.
News Details:
Navigate to details screen on item tap.
Display full news details including summary and author.
Created a Middleware for analytics
User Activities Logging:
Created middleware to log user activities and screen changes.

Over-the-Air Updates with CodePush

Set Up CodePush

## Unit Tests

Wrote unit tests using Jest.

Add a button on the news listing screen that throws a runtime error when pressed.

Deployed the application with Firebase App Tester

## To Run the App

Run yarn install command

Then run yarn android to run the android application
