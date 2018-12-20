import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';

export default class Cell extends React.Component {
  constructor(){
    super();
    this.state = {
      buttonPressed: false,
      buttonHover: false,
      buttonNumber: null,
    };
  }
  
  handler = () => {
    console.log(this.props.val);
    if (this.props.val === '') {
      this.props.buttonPressed(this.state.buttonNumber);
    }
  };
  
  componentDidMount() {
    this.setState({
      buttonNumber: this.props.keyButton,
    });
  }
  
  render() {
    return (
        <Text
          key={this.props.keyButton}
          style={
            {
              bottom: this.props.i * 150 + 200,
              left: this.props.j * 150 - 200,
              ...styles.button
            }
          }
          onPress = {this.handler}
        >
          {this.props.val}
        </Text>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: 'whitesmoke',
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: 'grey',
    textAlign: 'center',
    padding: 15,
    fontSize: 50,
  }
});