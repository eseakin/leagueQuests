import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import QuestCard from './QuestCard';
import CurrentQuestCard from './CurrentQuestCard';
// import { questList } from '../stubs/quests';
import axios from 'axios';

class QuestContainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      questList: null,
      activeQuest: null,
      questCards: null
    };
  }

  componentWillMount = () => {
    this.getQuests();
  }

  handleClick = (i) => {
    this.setState({activeQuest: this.state.questList[i]})
  }

  getQuests = () => {
    axios.get('/quests')
      .then((response) => {
        const { quests, questCards } = response.data;
        console.log('quests', quests, questCards);
        this.setState({activeQuest: quests[0], questList: quests, questCards: questCards});
      })
      .catch((error) => console.log(error))
  }

  beginQuest = () => {
    const { summonerName, region } = this.props;
    const questId = this.state.activeQuest.id;
    console.log('begin', summonerName, questId, new Date().getTime())
    axios.get(`/beginQuest/${region}/${summonerName}/${questId}`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => console.log(error))
  }

  completeQuest = () => {
    console.log('complete')
    axios.get('/completeQuest/' + this.props.region + '/' + this.props.summonerName)
    .then((res) => {
      if(res.data) {
        const questListUpdate = this.state.questList.map((quest) => {
          if(quest.id == res.data.questId)
            return Object.assign({}, quest, {completion: res.data.completion, champ: res.data.champ, time: res.data.time});
          else
            return quest;
        });
        console.log('completeQuest', questListUpdate)

        this.setState({questList: questListUpdate})
      } else {
        console.log('failed quest')
      }
      })
    .catch((err) => console.log(err));
  }

  handleDescription = (quest) => {
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

    return description.map((ele, i) => {
      if(i === 0) {
        return (<span key={i}>{description[i]}</span>)
      } else {
        const value = requirements[ri].displayValues[vi];
        const numberStyle = quest.completion > vi ? style.complete : style.incomplete;

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
              {description[i]}
            </span>
          </span>
        )
      }
    })
    
  }

  render() {
    const { activeQuest, questList, questCards } = this.state;

    return (
      <div>
        {questList && <CurrentQuestCard activeQuest={activeQuest} beginQuest={this.beginQuest} completeQuest={this.completeQuest} handleDescription={this.handleDescription} />}

        {questCards && questCards.map((questCard, i) => 
          <QuestCard 
            key={i}
            questList={questList} 
            activeQuest={activeQuest} 
            handleClick={this.handleClick} 
            cardQuests={questCard.quests}
            cardTitle={questCard.cardTitle}
            cardColor={questCard.cardColor}
            cardBackground={questCard.cardBackground} 
            handleDescription={this.handleDescription}
          />)}
        
      </div>
    )
  }
}

export default QuestContainer;
