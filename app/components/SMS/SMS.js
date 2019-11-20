import React from 'react';
import AppCamera from "../Camera/AppCamera";
import {Text, Dimensions, View} from "react-native";



const {width, height} = Dimensions.get('window')
export default class SMS extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {
      return (
          <AppCamera
              rightAction={() => this.props.jumpTo('second')}
          >
              <View style={{width: width, height: height, justifyContent: 'center', display: 'flex'}}>
                  <Text style={{textAlign: 'center'}}>SMS</Text>
              </View>
          </AppCamera>
      )
    }
}
