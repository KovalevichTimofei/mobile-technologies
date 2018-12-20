import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      page: 'send',
      weather: {},
    };
  }
  
  sendRequest = (numb) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Brest,by&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`,
    ).then(response => response.json())
      .then(data => this.parseInformation(data))
      .catch((e) => {
        alert(e);
      });
  };;
  
  parseInformation(weather) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    const date = new Date(weather.dt * 1000);
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const sunset = new Date(weather.sys.sunset * 1000);
    
    const currentWeather = {
      temperature: Math.round(weather.main.temp - 273.15),
      date: {
        year: date.getFullYear(),
        day: date.getDate(),
        month: months[date.getMonth()],
        monthNumber: date.getMonth(),
        hour: (new Date()).getHours(),
      },
      wind: {
        speed: weather.wind.speed,
        gust: weather.wind.gust,
        direction: this.getWindDirection(weather.wind.deg),
      },
      cloudness: this.makeFirstLetterUpper(weather.weather[0].description),
      pressure: weather.main.pressure,
      humidity: weather.main.humidity,
      sun: {
        sunrise: `${this.addZero(sunrise.getHours())}:${this.addZero(sunrise.getMinutes())}`,
        sunset: `${this.addZero(sunset.getHours())}:${this.addZero(sunset.getMinutes())}`,
      },
      icon: weather.weather[0].icon,
    };
    this.setState({
      weather: currentWeather,
      page: 'responce',
    });
  }
  
  addZero(n) {
    return n.toString().length === 1 ? `0${n}` : n.toString();
  }
  
  makeFirstLetterUpper(word) {
    return word === undefined || word === null ? undefined : `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }
  
  getWindDirection(degree) {
    if (degree === undefined) {
      return 'Неизвестно';
    }
    const dir = this.d2d(degree);
    
    const values = {
      E: 'ост',
      N: 'норд',
      S: 'зюйд',
      W: 'вест',
    };
    const result = dir.split('').map(item => values[item]);
    result[0] = this.makeFirstLetterUpper(result[0]);
    return result.join('-');
  }
  
  d2d(d) {
    if (typeof d !== 'number' || isNaN(d)) {
      return -1;
    }
    
    d = d % 360;
    
    if (11.25 <= d && d < 33.75) {
      return "NNE";
    } else if (33.75 <= d && d < 56.25) {
      return "NE";
    } else if (56.25 <= d && d < 78.75) {
      return "ENE";
    } else if (78.75 <= d && d < 101.25) {
      return "E";
    } else if (101.25 <= d && d < 123.75) {
      return "ESE";
    } else if (123.75 <= d && d < 146.25) {
      return "SE";
    } else if (146.25 <= d && d < 168.75) {
      return "SSE";
    } else if (168.75 <= d && d < 191.25) {
      return "S";
    } else if (191.25 <= d && d < 213.75) {
      return "SSW";
    } else if (213.75 <= d && d < 236.25) {
      return "SW";
    } else if (236.25 <= d && d < 258.75) {
      return "WSW";
    } else if (258.75 <= d && d < 281.25) {
      return "W";
    } else if (281.25 <= d && d < 303.75) {
      return "WNW";
    } else if (303.75 <= d && d < 326.25) {
      return "NW";
    } else if (326.25 <= d && d < 348.75) {
      return "NNW";
    } else {
      return "N";
    }
  };
  
  render() {
    const imgUrl = +this.state.weather.icon === +''
      ? 'https://openweathermap.org/img/w/01d.png'
      : `https://openweathermap.org/img/w/${this.state.weather.icon}.png`;
    return (
      <View style={styles.container}>
        {this.state.page !== 'responce'
          ? <Text
            onPress={this.sendRequest}
            style={styles.buttonSendRequest}
          >
            Отправить запрос на OpenWeatherMap
          </Text>
          : <View>
            <Text>
              Погода в г. Брест
            </Text>
            <View style={styles.row}>
              <Image source={{uri: imgUrl}} style={{ width: 30, height: 30 }}/>
              <View>
                <Text>
                  {this.state.weather.temperature}
                  °C
                </Text>
                <Text>
                {this.state.weather.date.day} {this.state.weather.date.month}, {this.state.weather.date.year}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text>
                Ветер
              </Text>
              <View>
                <Text>
                  Скорость - {this.state.weather.wind.speed} м/с,
                </Text>
                <Text>
                порывы - {this.state.weather.wind.gust} м/с,
                </Text>
                <Text>
                  направление - {this.state.weather.wind.direction}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text>
                Облачность
              </Text>
              <Text>
                {this.state.weather.cloudness}
              </Text>
            </View>
            <View style={styles.row}>
              <Text>
                Давление
              </Text>
              <Text>
                {this.state.weather.pressure} гПа
              </Text>
            </View>
            <View style={styles.row}>
              <Text>
                Влажность
              </Text>
              <Text>
                {this.state.weather.humidity}%
              </Text>
            </View>
            <View style={styles.row}>
              <Text>
                Восход Солнца
              </Text>
              <Text>
                {this.state.weather.sun.sunrise}
              </Text>
            </View>
            <View style={styles.row}>
              <Text>
                Закат Солнца
              </Text>
              <Text>
                {this.state.weather.sun.sunset}
              </Text>
            </View>
          </View>
        }
      </View>
    )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 100,
  },
  buttonSendRequest: {
    backgroundColor: 'whitesmoke',
    height: 50,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    textAlign: 'center',
    padding: 7,
    fontSize: 25,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
  }
});
