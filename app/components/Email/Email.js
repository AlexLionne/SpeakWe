import React from 'react';
import AppCamera from "../Camera/AppCamera";
import {Dimensions, Text, View} from "react-native";
import Slider from '../Slider';

const {width, height} = Dimensions.get('window')
export default class EMAIL extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        };

    }
    render() {
        return (
<<<<<<< HEAD
            <AppCamera 
                blinkAction={() => {console.log('both')}}
                rightAction={() => {console.log('right')}}
                leftAction={() => {console.log('left')}}
=======
            <AppCamera
                blinkAction={() => {console.log('both')}}
                leftAction={() => {console.log('left')}}
                rightAction={() => {console.log('right')}}
>>>>>>> refs/remotes/origin/master
            >
                <View style={{width: width, height: height, justifyContent: 'center', display: 'flex'}}>
                    <Slider />
                </View>
            </AppCamera>
        )
    }
}
