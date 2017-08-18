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

    this.getSummonerData('NA1', 'label out');
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

  getSummonerData = (region, summonerName) => {
    // summonerName = 'escape goat'
    axios.get(`summonerData/${region}/${summonerName}`)
    .then((res) => {
        console.log('summonerData', res.data)
        const { accountId, summonerName, region, currentQuestId, profileIcon, questStart, userQuests } = res.data
        this.setState({ accountId, summonerName, region, currentQuestId, profileIcon, questStart, userQuests });
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
      backgroundUrl,
      summonerName,
      accountId,
      region,
      currentQuestId,
      profileIcon,
      questStart,
      userQuests
       } = this.state;

    const version = '7.16.1'   

    // console.log('version', version)
    const iconPath = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/';
    const skinPath = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
    const splashPath = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

    return (
      <div className="App" style={{height: windowHeight}}>
        <div className="App-header">
          <img src="../leagueQuests.png" alt="Welcome to League Skins"/>
          <p style={{color: 'white', float: 'right', marginRight: 10}}>SUMMONER NAME: {summonerName}</p>
        </div>

        <QuestContainer 
          summonerName={summonerName} 
          accountId={accountId} 
          region={region} 
          currentQuestId={currentQuestId}
          profileIcon={profileIcon}
          questStart={questStart}
          userQuests={userQuests}
        />

        <div className='footer' style={{color:'white'}}>
        
        </div>

        <div className='background'>
          <img className='champDetailBackground' src={backgroundUrl} />
        </div>
      </div>
    );
  }
}

export default App;










