# RN-iOS-Native-Module
Create a react native app with a ios Native Module to get the gps location with below functions.  
1. getCurrentPosition: this will return the current location in success callback, in case of an error call the error calback 
2. startLocationUpdates: This will start sending an event when the location is changed 
3. stopLocationUpdates: This will stop listening to location changes and hence stop sending the events


## How to install?
1. Clone the Project using Commmad line or XCode or Anyother other tool.
2. You need to install iOS Pod frameworks.
   - Open terminal and change directory to root folder of project. 
   
     ``` $ cd <REPOSITORY-NAME> ```
     
   - Change the direct to iOS(Where podfile is located) 
   
   - Run 
   
     ``` $ brew install git-lfs ```
     
     ``` $ git lfs install ```
     
     ``` $ pod install/update ```
   
   - Once install Pod successfully open the ** rn-ios-native-module.xcworkspace ** and Run app in simulator.

### How to Run react native project
1. Open Terminal/Open in Visual Studio Code terminal
2. Change to root directory(Folder contains App.js file) 

   ``` 
   $ cd <ROOT_DIRECTORY> 
   ```
   
3. Update the Node packages 

   ``` 
   $ sudo npm install 
   ```
   
4. Run the App with expo

   ```
   $ expo start / $ npm start
   ```
   
   To Clear Cache and Run
   
   ```
   $ expo start -c
   ```
 
5. Running your react native on your Android or iOS devices
   This step will be divided into two: Android & iOS part.

   **Android**
   
   - Download the Expo client app to your Android device.
     
   - Open Expo then click the “Scan QR Code” and Scan the QR code in our terminal.
     
   - As soon as the QR code got scanned, it’ll automatically load and bundle/compile your project to run it in your device.
     
   **iOS**
   
   - Download the latest Expo client app to your iOS device.
     
   - With iOS 11, there is now a scan feature added to the camera. We can use this to scan the QR code and open the Expo client app.
     
   - Open up your camera app, then scan the QR code in our terminal until a notification badge pops on top telling us that we can open it in Expo client.
     
   However, if you’re not in iOS 11, there’s still an alternative way but not with scanning:
   
   - Open your Expo client app and sign up/login.
     
   - Open another new tab in your terminal and navigate to your react-native project directory and run.
      ```
      $ expo send -s yourname@email.com
      ```
        
   - use the email that is logged in your expo app. This will send an email to you with the link, clicking this link will open the app in expo. Then it’ll have your project up and running on your iPhone.


### Publish App to AppStore and PlayStore
  **iOS**
  1. Keep all the necessary files such as Apple Account, Certificates, Provisional Profile.
  2. Run
     To genearate build.
     ```
     $ exp build:ios
     ```
     To clear the previous credentials
     ```
     $ exp build:ios -c
     ```
  **Android**
  1. Keep all the necessary files required for PlayStore.
  2. Run
     To genearate build.
     ```
     $ exp build:android
     ```
     To clear the previous credentials
     ```
     $ exp build:android -c
     ```
