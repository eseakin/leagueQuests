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
    console.log('click', i)
    this.setState({activeQuest: questList[questLineIndex].quests[i]})
  }

  beginQuest = () => {
    console.log('begin')
  }

  completeQuest = () => {
    console.log('complete')

  }

  render() {
    const { activeQuest } = this.state;

    return (
      <Container className='questCardContainer'>
        <CurrentQuestCard activeQuest={activeQuest} beginQuest={this.beginQuest} completeQuest={this.completeQuest} />

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
          />)}
        
      </Container>
    )
  }
}

export default QuestContainer;
