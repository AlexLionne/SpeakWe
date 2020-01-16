import React from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput } from 'react-native';

const {width, height} = Dimensions.get('window')

export default class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLetter: 'e',
            currentIndex: 1,
            currentWord: ''
        }
        this.alphabet = [...'esarintulomdpcfbvhjqzyxkw'];
    }

    componentDidMount() {
        this.renderLetter()
    }
 
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    renderLetter = () => {
        this.interval = setInterval(() => {
                this.setState({currentLetter: this.alphabet[this.state.currentIndex], 
                    currentIndex: this.state.currentIndex === this.alphabet.length ? 0 : this.state.currentIndex + 1})
            }, 1000)
    }
    renderLetters = () => (this.alphabet.map(letter => (
            <Text style={
                this.alphabet[this.state.currentIndex] === letter ? 
                {textAlign: 'center',color: 'white', fontSize: 30, fontWeight: 'bold'}
                :
                {textAlign: 'center',color: 'rgba(255, 255, 255, .5)', fontSize: 20}
            }>{letter}</Text> 
        )))
    
    renderWord = (currentLetter) => {
        let currentWord = this.state.currentWord
        currentWord += currentLetter
        console.log(currentWord)
        this.setState({currentWord})
        console.log(this.state.currentIndex)
        this.setState({ currentIndex: 0 })
    }

    render () {
        return (
            <View 
            style={Style.container}
            >
              <View>
                <Text 
                style={{marginTop: 100, color: 'white', fontSize: 200, fontWeight: 'bold', position: 'relative'}}
                onPress={() => this.renderWord(this.state.currentLetter)}
                >
                  {this.state.currentLetter}
                </Text>
            </View>
                <TextInput
                style={{color: 'white', position: 'absolute'}}
                >
                    {this.state.currentWord}
                </TextInput>
              {/* <View style={{flexDirection: 'row', position: 'absolute', marginHorizontal: 24, bottom: 100}}>{this.renderLetters()}</View> */}
            </View>
        );
    }
}

const Style = StyleSheet.create ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        height: height,
        backgroundColor: '#309383',
    },
});