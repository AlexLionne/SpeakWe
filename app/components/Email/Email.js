import React from 'react';
import AppCamera from "../Camera/AppCamera";
import {Dimensions, Text, View} from "react-native";

const {width, height} = Dimensions.get('window')
export default class EMAIL extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        };

    }
    render() {
        return (
            <AppCamera
                blinkAction={() => {console.log('both')}}
                leftAction={() => {console.log('left')}}
                rightAction={() => {console.log('right')}}
            >
                <View style={{width: width, height: height, justifyContent: 'center', display: 'flex'}}>
                    <Text style={{textAlign: 'center'}}>EMAIL</Text>
                </View>
            </AppCamera>
        )
    }
}
