import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import QuestContainer from './QuestContainer';
// import {Popup} from 'semantic-ui-react'
// import ChampDetail from './ChampDetail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      resizeUpdate: false,
      activeView: 'quests',
      backgroundUrl: 'http://cdn.leagueoflegends.com/lolkit/1.1.6/resources/images/bg-default.jpg',
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    if(window.location.host != 'localhost:9000') {
      axios.get('/visitorCount')
      .then((res) => true)
      .catch((error) => console.log(error));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentWillMount() {
    this.updateDimensions();

    // axios.get('/champData')
    // .then((res) => {
    //     // console.log('componentWillMount', res.data)
    //     this.setState({
    //       champData: res.data,
    //       champsDisplayed: res.data.data
    //     });
    //   })
    // .catch((err) => console.log(err));

    // this.getSummonerData();
  }

  updateDimensions = () => {
    let update = this.state.resizeUpdate;

    if(!update) {
      this.setState({
        windowWidth: window.innerWidth, 
        windowHeight: window.innerHeight, 
        resizeUpdate: true, 
        resizeUpdate: false
      });
    }
  }

  getSummonerData = (summonerName) => {
    // summonerName = 'escape goat'
    axios.get('/summonerData/' + summonerName)
    .then((res) => {
        console.log('summonerData', res.data)
        this.setState({ summonerData: res.data });
      })
    .catch((err) => console.log(err));
  }

  

  render = () => {
    // console.log('render')
    const { 
      windowWidth,
      windowHeight,
      champData, 
      activeView, 
      backgroundUrl
       } = this.state;

    const version = '7.16.1'   

    // console.log('version', version)
    const iconPath = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/';
    const skinPath = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
    const splashPath = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

    // let iconSize = windowWidth > 600 ? 110 : 70;
    // let iconsPerRow = Math.floor(windowWidth / iconSize);

    return (
      <div className="App" style={{height: windowHeight}}>
        <div className="App-header">
          <img src="../leagueQuests.png" alt="Welcome to League Skins"/>
        </div>

        <QuestContainer />

        <div className='background'>
          <img className='champDetailBackground' src={backgroundUrl} />
        </div>
      </div>
    );
  }
}

export default App;










