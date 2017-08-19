import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import QuestContainer from './QuestContainer';
import { Image, Icon, Modal } from 'semantic-ui-react'
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      resizeUpdate: false,
      activeView: 'quests',
      backgroundUrl: 'http://cdn.leagueoflegends.com/lolkit/1.1.6/resources/images/bg-default.jpg',
      loggedIn: false,
      showModal: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    if(window.location.host != 'localhost:9000') {
      axios.get('/visitorCount')
      .then((res) => true)
      .catch((error) => console.log(error));
    }

    // this.getSummonerData('NA1', 'label out');
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

    axios.get('/config')
    .then((res) => {
        console.log('config', res.data)
        this.setState({
          fb: fb.initializeApp(res.data),
        });
      })
    .catch((err) => console.log(err));

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

  createNewAccount = (data) => {
    let { username, password } = data;
    console.log('app create account', username, password)

    axios.post(`/createNewAccount/${username}/${password}`)
      .then((response) => {
          if(!response.data.message) {
            console.log('success', response.data)
            this.setState({loggedIn: true, user: response.data});
          } else {
            console.log('fail', response.message)
            this.setState({status: response.message})
          }
      })
      .catch((error) => console.log(error));
  }

  loginSubmit = (data) => {
    let { username, password } = data;
    console.log('app submit', username, password)

    // this.getSummonerData('NA1', username);
    DEV ONLY
    username = '2@2.com';
    password = '123456';

    axios.post(`/login/${username}/${password}`)
      .then((response) => {
          if(response.loggedIn) {
            console.log('axios this', this)
            this.setState({loggedIn: true, userId: response.uid});
          } else {
            this.setState({status: response.message})
          }
      })
      .catch((error) => console.log(error));
  }

  getSummonerData = (region, summonerName) => {
    // summonerName = 'escape goat'
    axios.get(`summonerData/${region}/${summonerName}`)
    .then((res) => {
        console.log('summonerData', res.data)
        const { accountId, summonerName, region, currentQuestId, profileIconId, questStart, userQuests } = res.data
        this.setState({ accountId, summonerName, region, currentQuestId, profileIconId, questStart, userQuests, loggedIn: true });
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
      profileIconId,
      questStart,
      userQuests,
      loggedIn
       } = this.state;

    const version = '7.16.1'   

    // console.log('version', version)
    const iconPath = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/';
    const skinPath = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
    const splashPath = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    console.log(profileIconId)

    return (
      <div className="App" style={{height: windowHeight}}>
        <div className="App-header">
          <img src="../leagueQuests.png" alt="Welcome to League Skins"/>

          {!loggedIn &&
            <Login loginSubmit={this.loginSubmit} status={loggedIn} createNewAccount={this.createNewAccount} />
          }


          <p style={{color: 'white', float: 'right', marginRight: 10}}>{summonerName}</p>
          {profileIconId && <Image src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileIconId}.png`} style={{float: 'right', width: 50}}/>}
        </div>

        <QuestContainer 
          summonerName={summonerName} 
          accountId={accountId} 
          region={region} 
          currentQuestId={currentQuestId}
          profileIconId={profileIconId}
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










