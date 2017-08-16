import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import QuestCard from './QuestCard';
import CurrentQuestCard from './CurrentQuestCard';
import { questList } from '../stubs/quests';


class QuestContainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      activeQuest: questList[0].quests[0]
    };
  }

  handleClick = (questLineIndex, i) => {
    this.setState({activeQuest: questList[questLineIndex].quests[i]})
  }

  beginQuest = () => {
    console.log('begin')
  }

  completeQuest = () => {
    console.log('complete')

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
    const { activeQuest } = this.state;

    return (
      <div>
        <CurrentQuestCard activeQuest={activeQuest} beginQuest={this.beginQuest} completeQuest={this.completeQuest} handleDescription={this.handleDescription} />
        
        {Object.keys(questList).map((key, i) => 
          <QuestCard 
            key={key}
            questLineIndex={i}
            questList={questList[key].quests} 
            activeQuest={activeQuest} 
            handleClick={this.handleClick} 
            cardTitle={questList[key].cardTitle}
            cardColor={questList[key].cardColor}
            cardBackground={questList[key].cardBackground} 
            handleDescription={this.handleDescription}
          />)}
        
      </div>
    )
  }
}

export default QuestContainer;
