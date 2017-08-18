import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import QuestCard from './QuestCard';
import CurrentQuestCard from './CurrentQuestCard';
// import { questList } from '../stubs/quests';
import axios from 'axios';

class QuestContainer extends Component {
  constructor(props) {
    super(props);

    // const noQuest = {}
  
    this.state = {
      questList: null,
      activeQuest: null,
      selectedQuest: null,
      questCards: null,
    };
  }

  componentWillMount = () => {
    this.getQuests();
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.userQuests) {
      const { questList } = this.state
      const newQuestList = questList.map((quest, i) => {
        return Object.assign({}, quest, nextProps.userQuests[i]);
      })
      this.setState({questList: newQuestList})
    }
  }

  handleClick = (i) => {
    this.setState({selectedQuest: this.state.questList[i]})
  }

  getQuests = () => {
    axios.get('/quests')
      .then((response) => {
        const { quests, questCards } = response.data;
        // console.log('quests', quests, questCards);
        this.setState({questList: quests, questCards: questCards});
      })
      .catch((error) => console.log(error))
  }

  beginQuest = () => {
    const { region, summonerName } = this.props;
    const questId = this.state.selectedQuest.id;
    console.log('begin', region, summonerName, questId)
    axios.get(`/beginQuest/${region}/${summonerName}/${questId}`)
    .then((response) => {
      console.log(response.data)
      this.setState({activeQuest: this.state.questList[questId]});
    })
    .catch((error) => console.log(error))
  }

  //NEEDS TO UPDATE CURRENT QUEST AND POPUPQUEST RENDERING
  completeQuest = () => {
    console.log('complete')
    axios.get('/completeQuest/' + this.props.region + '/' + this.props.summonerName)
    .then((res) => {
      if(res.data) {
        let questUpdate;
        const questListUpdate = this.state.questList.map((quest) => {
          if(quest.id == res.data.questId) {
            questUpdate = Object.assign({}, quest, {completion: res.data.completion, champ: res.data.champ, time: res.data.time});
            return questUpdate;
          } else {
            return quest;
          }
        });
        console.log('completed quest', questUpdate.completion)
        this.setState({questList: questListUpdate, selectedQuest: questUpdate, activeQuest: null })
      } else {
        console.log('failed quest')
      }
      })
    .catch((err) => console.log(err));
  }

  handleDescription = (quest, completion) => {
    const description = quest.description.split('$');
    const requirements = quest.requirements;

    let ri = 0;
    let vi = 0;

    const style = {
      complete: {
        color: '#ccc'
      },
      incomplete: {
        color: '#00eaff'
      }
    }

    return description.map((descriptionText, i) => {
      if(i === 0) {
        return (<span key={i}>{descriptionText}</span>)
      } else {
        const value = requirements[ri].displayValues[vi];
        const numberStyle = completion > vi ? style.complete : style.incomplete;

        if(vi >= requirements[ri].displayValues.length - 1) {
          ri++;
          vi = 0;
        } else {
          vi++;
        }

        return (
          <span key={i}>
            <span style={numberStyle}>
              {value}
            </span>
            <span>
              {descriptionText}
            </span>
          </span>
        )
      }
    })
    
  }

  handleCompletion = (questId) => {
    let completion = 0;
    if(this.state.questList)
      completion = this.state.questList[questId].completion || 0;

    return completion;
  }

  render() {
    const { 
      activeQuest, 
      selectedQuest,
      questList, 
      questCards } = this.state;

    const {       
      summonerName,
      accountId,
      region,
      currentQuestId,
      profileIcon,
      questStart,
      userQuests } = this.props; 

    return (
      <div>
        {questList && 
          <CurrentQuestCard 
          handleCompletion={this.handleCompletion} 
          selectedQuest={selectedQuest}
          activeQuest={activeQuest} 
          beginQuest={this.beginQuest} 
          completeQuest={this.completeQuest} 
          handleDescription={this.handleDescription} 
        />}

        {questCards && questCards.map((questCard, i) => 
          <QuestCard 
            key={i}
            questList={questList} 
            selectedQuest={selectedQuest}
            activeQuest={activeQuest} 
            handleClick={this.handleClick} 
            cardQuests={questCard.quests}
            cardTitle={questCard.cardTitle}
            cardColor={questCard.cardColor}
            cardBackground={questCard.cardBackground} 
            handleDescription={this.handleDescription}
            handleCompletion={this.handleCompletion}
          />)}
        
      </div>
    )
  }
}

export default QuestContainer;



