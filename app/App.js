import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';

export default class App extends React.Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
        isLeftEyeOpen: null,
        isRightEyeOpen: null,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleFaces = (faces) => {
        let face = faces[0]
        if(face) {
            if(!face.leftEyeOpenProbability) {
                this.setState({isLeftEyeOpen: face.leftEyeOpenProbability})
            }
            if(!face.rightEyeOpenProbability) {
                this.setState({isRightEyeOpen: face.rightEyeOpenProbability})
            }
        }

    }
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, height: 100, width: 100 }}
                            onFacesDetected={(faces) => this.handleFaces(faces)}
                            faceDetectorSettings={{
                                mode: FaceDetector.Constants.Mode.fast,
                                detectLandmarks: FaceDetector.Constants.Landmarks.all,
                                runClassifications: FaceDetector.Constants.Classifications.all,
                                minDetectionInterval: 100,
                                tracking: true,
                            }}
                            type={this.state.type}>
                    </Camera>
                    <View>
                        <Text>{this.state.isRightEyeOpen} | {this.state.isLeftEyeOpen}</Text>
                    </View>
                </View>
            );
        }
    }
}
