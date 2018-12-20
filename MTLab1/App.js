import React from 'react';
import { StyleSheet, Text, View, Alert, BackHandler} from 'react-native';
import Cell from './Cell';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      logs: [],
      buttons: ['', '', '', '', '', '' ,'', '', '',],
      curTurn: 'X',
      isGameOver: 'X',
    };
  }
  
  buttonPressed = (numb) => {
    let newState = [...this.state.buttons];
    newState[numb] = this.state.curTurn;
    this.setState(
      {
        curTurn: this.state.curTurn === 'X' ? '0' : 'X',
        buttons: newState,
      }
    );
    let field = [newState.slice(6, 9), newState.slice(3, 6), newState.slice(0, 3),];
    if (this.evaluateTicTacToePosition(field) === 'X') {
      this.setState({isGameOver: 'X'})
    } else if (this.evaluateTicTacToePosition(field) === '0') {
      this.setState({isGameOver: '0'})
    }
  };
  
  renderField = () => {
    const log = [];
    const res = [];
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        log.push(`${j} `);
        this.state.logs = [...this.state.logs, log.toString()];
        res.push(
          <Cell
            key={i * 3 + j}
            keyButton={i * 3 + j}
            buttonPressed={this.buttonPressed}
            i={i}
            j={j}
            val={this.state.buttons[i * 3 + j]}
         />
        );
      }
    }
    return res;
  };
  
  evaluateTicTacToePosition = (position) => {
    
    for (let i = 0; i < position.length; i++)
    {
      if(position[i][0] === position[i][1] && position[i][1] === position [i][2])
      {
        if(position[i][0] === 'X') return 'X';
        else if(position[i][0] === '0') return '0';
      }
      else if(position[0][i] === position[1][i] && position[1][i] === position[2][i])
      {
        if(position[0][i] === 'X') return 'X';
        else if(position[0][i] === '0') return '0';
      }
    }
    
    if(position[0][0] === position[1][1] && position[1][1] === position[2][2])
    {
      if(position[1][1] === 'X') return 'X';
      else if(position[1][1] === '0') return '0';
    }
    else if(position[0][2] === position[1][1] && position[1][1] === position[2][0])
    {
      if(position[1][1] === 'X') return 'X';
      else if(position[1][1] === '0') return '0';
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.isGameOver
          ? <View style={styles.endContainer}>
              <Text style={styles.endTitle}>{this.state.isGameOver === '0' ? 'Нолики' : 'Крестики'} выиграли</Text>
              <View style={styles.buttonRow}>
                <Text
                  style={styles.endButton}
                  onPress={() => this.setState({
                    isGameOver: null,
                    logs: [],
                    buttons: ['', '', '', '', '', '' ,'', '', '',],
                    curTurn: 'X',
                  })}
                >
                  Продолжить
                </Text>
                <Text style={styles.endButton} onPress={() => BackHandler.exitApp()}>Выйти</Text>
              </View>
            </View>
          : <View style={styles.buttonRow}>
          {this.renderField()}
          </View>
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  },
  endContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  endTitle: {
    marginTop: 300,
    fontSize: 25,
  },
  endButton: {
    backgroundColor: 'whitesmoke',
    height: 50,
    borderWidth: 5,
    borderColor: 'grey',
    textAlign: 'center',
    padding: 7,
    fontSize: 25,
    marginRight: 20,
    marginBottom: 300,
  }
});
