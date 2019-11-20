import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector'
import {Camera} from 'expo-camera'


const {width, height} = Dimensions.get('window')

export default class AppCamera extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.front,
            leftEye: 0,
            rightEye: 0,
            isFace: false,
            leftEyeStates: [],
            rightEyeStates: [],
        }
        this.i = 0
    }

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    handleFaces = (result) => {

        const {rightEyeStates, leftEyeStates} = this.state
        let face = result.faces[0]
        if (result.faces.length) {
            // eye state
            const right = Math.floor(face.rightEyeOpenProbability * 10)
            const left = Math.floor(face.leftEyeOpenProbability * 10)
            // check eyes state
            if (rightEyeStates[rightEyeStates.length - 1] !== right) {
                if(rightEyeStates.length < 4) {
                    this.setState({rightEyeStates: this.state.rightEyeStates.concat(right)})
                } else {
                    rightEyeStates.pop()
                    rightEyeStates.unshift(right)
                    this.setState({rightEyeStates})
                }
            } else {
                this.setState({rightEyeStates: []})
            }

            if (leftEyeStates[leftEyeStates.length - 1] !== left) {
                if(leftEyeStates.length < 4) {
                    this.setState({leftEyeStates: this.state.leftEyeStates.concat(left)})
                } else {
                    leftEyeStates.pop()
                    leftEyeStates.unshift(left)
                    this.setState({leftEyeStates})
                }
            } else {
                this.setState({leftEyeStates: []})
            }

            if(rightEyeStates.length === 3) {
                let initialRightEyeState, lastRightEyeState, rightEyeState

                initialRightEyeState = rightEyeStates[0]
                lastRightEyeState = rightEyeStates[1]
                rightEyeState = rightEyeStates[2]


                if(initialRightEyeState && !lastRightEyeState && rightEyeState) {
                    this.props.rightAction()
                }
            }

            if(leftEyeStates.length === 3) {
                let initialLeftEyeState, lastLeftEyeState, leftEyeState

                initialLeftEyeState = leftEyeStates[0]
                lastLeftEyeState = leftEyeStates[1]
                leftEyeState = leftEyeStates[2]


                if(initialLeftEyeState && !lastLeftEyeState && leftEyeState) {
                    this.props.leftAction()
                }
            }

        }
        else {
            this.setState({rightEyeStates: [], leftEyeStates: []})
        }
    }


    render() {
        const {hasCameraPermission} = this.state
        if (hasCameraPermission === null) {
            return <View/>
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={{width: width, height: height, textAlign: 'center'}}>
                    <Camera style={{flex: 1, height: 0, width: 0}}
                            minDetectionInterval={1000}
                            onFacesDetected={(faces) => this.handleFaces(faces)}
                            faceDetectorSettings={{
                                mode: FaceDetector.Constants.Mode.accurate,
                                detectLandmarks: FaceDetector.Constants.Landmarks.none,
                                runClassifications: FaceDetector.Constants.Classifications.all,
                                minDetectionInterval: 100,
                                tracking: true,
                            }}
                            type={this.state.type}>
                    </Camera>
                   {this.props.children}
                </View>
            )
        }
    }
}
