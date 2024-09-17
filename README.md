## Setup

Created a GitHub repository named quicknews.

Cloned the repository to my local machine.

Initialize React Native Project with the following command: npx react-native init quicknews --template react-native-template-typescript

Install the required dependencies with the following command:
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs redux react-redux @reduxjs/toolkit axios react-native-code-push

Integration with local sqlite database
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
Created an about me page
Created a Middleware for analytics
User Activities Logging:
Created middleware to log user activities and screen changes.

Over-the-Air Updates with CodePush

Set Up CodePush

## Unit Tests

Wrote unit tests using Jest.

## To Run the App

Clone the repository to you local device

Make you have node >v18

Run yarn install command

Then run yarn android to run the android application

## To install the APK

The link to the apk in this repo is https://github.com/brightakin/QuickNews/blob/main/android/app/build/outputs/apk/release/app-release.apk

You can download and install
