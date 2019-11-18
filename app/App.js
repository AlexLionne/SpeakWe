import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';


const {width, height} = Dimensions.get('window')
export default class App extends React.Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
        isLeftEyeOpen: false,
        isRightEyeOpen: false,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleFaces = (result) => {
        let face = result.faces[0]

        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
            if(result.faces.length) {
                if(!Math.floor(face.leftEyeOpenProbability * 10)) {
                    this.setState({isLeftEyeOpen: false})
                } else {
                    this.setState({isLeftEyeOpen: true})
                }
                if(!Math.floor(face.rightEyeOpenProbability * 10)) {
                    this.setState({isRightEyeOpen: false})
                } else {
                    this.setState({isRightEyeOpen: true})
                }
            } else {
                this.setState({isRightEyeOpen: false, isLeftEyeOpen: false})
            }
        }, 800)

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
                    <Camera style={{ flex: 1, height: 300, width: 300 }}
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
                        <View style={{ display: 'flex',           /* establish flex container */
                            flexDirection: 'column',  /* make main axis vertical */
                            justifyContent: 'center', /* center items vertically, in this case */
                            alignItems: 'center',
                            height: height, width: width, backgroundColor: this.state.isRightEyeOpen && this.state.isLeftEyeOpen ? 'white' : 'black'}}>
                            <Text style={{textAlign: 'center', fontSize: 30, color: this.state.isRightEyeOpen && this.state.isLeftEyeOpen ? 'black' : 'white'}}>
                                {
                                    this.state.isRightEyeOpen && this.state.isLeftEyeOpen ? 'ouvert' : 'fermé'
                                }
                            </Text>
                        </View>
                </View>
            );
        }
    }
}
