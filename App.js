import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';

import { NativeEventEmitter, NativeModules } from 'react-native';
import Buttons from './android/src/helper/Buttons';
const { LocationHelper } = NativeModules;

var locationHelper = require('NativeModules').LocationHelper
const calendarManagerEmitter = new NativeEventEmitter(LocationHelper);

// YellowBox.ignoreWarnings(['Class RCTCxxModule']);
console.disableYellowBox = true

export default class App extends React.Component {

  state = {
    location: {},
    isUpdatingLocation: true
  }

  componentWillMount() {

    const subscription = calendarManagerEmitter.addListener('HandleLocationUpdate', (reminder) => {
      console.log("Status: ", reminder.status);
      console.log("error: ", reminder.error);
      console.log("Data: ", reminder.data);

      this.setState({
        location: reminder.data
      })
    });
    locationHelper.startUpdatingLocation()
  }

  componentWillUnmount() {
    subscription.remove();
  }

  renderContent() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Address</Text>
        </View>

        {this.state.location.street !== "(null)" ? (<Text style={styles.otherText}>{this.state.location.street}</Text>) : null}
        {this.state.location.area !== "(null)" ? (<Text style={styles.otherText}>{this.state.location.area}</Text>) : null}
        {this.state.location.city !== "(null)" ? (<Text style={styles.otherText}>{this.state.location.city}</Text>) : null}
        {this.state.location.state !== "(null)" ? (<Text style={styles.otherText}>{this.state.location.state}</Text>) : null}
        {this.state.location.country !== "(null)" ? (<Text style={styles.otherText}>{this.state.location.country}</Text>) : null}
        {this.state.location.zipCode !== "(null)" ? (<Text style={styles.otherText}>{this.state.location.zipCode}</Text>) : null}
        {this.state.location.lat !== "(null)" ? (<Text style={styles.otherText}>Lat: {this.state.location.lat}</Text>) : null}
        {this.state.location.lng !== "(null)" ? (<Text style={styles.otherText}>Long: {this.state.location.lng}</Text>) : null}

      </View>
    );
  }

  onPressStartHandler = () => {

    if (this.state.isUpdatingLocation == false) {
      locationHelper.startUpdatingLocation()
      this.setState({ isUpdatingLocation: true });
    }
  }

  onPressStopHandler = () => {
    
    if (this.state.isUpdatingLocation == true) {
      locationHelper.stopUpdatingLocation()
      this.setState({ isUpdatingLocation: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        <Buttons
          isUpdatingLocation={this.state.isUpdatingLocation}
          onPressStart={this.onPressStartHandler}
          onPressStop={this.onPressStopHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  labelContainer: {
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    marginTop: 84
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#60D1A0'
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherText: {
    fontSize: 12,
    marginTop: 7
  },
});
