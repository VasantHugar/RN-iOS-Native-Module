import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const buttons = (props) => (
    <View>
        <View style={styles.container}>

            <TouchableOpacity onPress={() => props.onPressStart()} style={styles.touchableContainer} disabled={props.isUpdatingLocation}>
                <View style={styles.touchableView}>
                    <Text style={[styles.touchableText, { color: props.isUpdatingLocation ? "#EBEBEB" : "#60D1A0" }]}>Start Updating</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.virticalSeperator} />

            <TouchableOpacity onPress={() => props.onPressStop()} style={styles.touchableContainer} disabled={!props.isUpdatingLocation}>
                <View style={styles.touchableView}>
                    <Text style={[styles.touchableText, { color: props.isUpdatingLocation ? "#60D1A0" : "#EBEBEB" }]}>Stop Updating</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 44,
        alignItems: "center",
        backgroundColor: "white",
        marginLeft: 20,
        marginRight: 20,
    },
    touchableContainer: {
        flex: 1,
    },
    touchableView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    touchableText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    virticalSeperator: {
        backgroundColor: "#EBEBEB",
        width: 20,
        height: "100%"
    },
});

export default buttons;
